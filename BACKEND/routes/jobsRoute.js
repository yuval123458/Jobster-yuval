const express = require("express");
const CheckAuth = require("../CheckAuth");
const Job = require("../models/Job");

const router = express.Router();

router.get("/alljobs", CheckAuth, async (req, res) => {
  try {
    const jobs = await Job.findOne({ user: req.userId });

    const { status, type, sort } = req.query;
    console.log(req.query);

    if (!jobs) {
      return res.status(201).send({ jobs: [], totalJobs: 0, NumOfPages: 1 });
    }

    if (status !== "all") {
      jobs.jobs = jobs.jobs.filter((job) => job.status === status);
    }
    if (type !== "all") {
      jobs.jobs = jobs.jobs.filter((job) => job.type === type);
    }
    if (sort === "latest") {
      jobs.jobs.sort((a, b) => {
        const aKey = new Date(a.createdAt);
        const bKey = new Date(b.createdAt);

        if (aKey < bKey) {
          return 1;
        }
        if (aKey > bKey) {
          return -1;
        }
        return 0;
      });
    }
    if (sort === "oldest") {
      jobs.jobs.sort((a, b) => {
        const aKey = new Date(a.createdAt);
        const bKey = new Date(b.createdAt);

        if (aKey < bKey) {
          return -1;
        }
        if (aKey > bKey) {
          return 1;
        }
        return 0;
      });
    }
    if (sort === "a-z") {
      jobs.jobs.sort((a, b) => {
        const aKey = a.position.toUpperCase();
        const bKey = b.position.toUpperCase();
        if (aKey < bKey) {
          return -1;
        }
        if (aKey > bKey) {
          return 1;
        }
        return 0;
      });
    }
    if (sort === "z-a") {
      jobs.jobs.sort((a, b) => {
        const aKey = a.position.toUpperCase();
        const bKey = b.position.toUpperCase();
        if (aKey > bKey) {
          return -1;
        }
        if (aKey < bKey) {
          return 1;
        }
        return 0;
      });
    }
    if (req.query.search) {
      const searchParam =
        req.query.search.charAt(0).toUpperCase() + req.query.search.slice(1);

      jobs.jobs = jobs.jobs.filter((job) => {
        return job.position.includes(searchParam);
      });
    }

    const totalJobs = jobs.jobs.length;

    const NumOfPages = Math.ceil(totalJobs / 10);

    return res
      .status(201)
      .send({ jobs: jobs.jobs, totalJobs: totalJobs, NumOfPages: NumOfPages });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "server error" });
  }
});

router.get("/stats", CheckAuth, async (req, res) => {
  try {
    const jobs = await Job.findOne({ user: req.userId });

    const interview = jobs.jobs.filter((job) => job.status === "interview");
    const pending = jobs.jobs.filter((job) => job.status === "pending");
    const declined = jobs.jobs.filter((job) => job.status === "declined");

    const defaultStats = {
      interview: interview.length,
      pending: pending.length,
      declined: declined.length,
    };

    const monthlyApplications = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);

      monthlyApplications.push({
        date: date.toLocaleString("en-US", {
          month: "short",
          year: "numeric",
        }),
        count: jobs.jobs.filter(
          (job) => job.createdAt.getMonth() === date.getMonth()
        ).length,
      });
    }

    return res.status(201).send({
      defaultStats: defaultStats,
      monthlyApplications: monthlyApplications,
    });
  } catch (error) {
    return res.status(500).send({ msg: "server error" });
  }
});

router.patch("/edit-job", CheckAuth, async (req, res) => {
  const { id } = req.body;
  const { position, company, location, type, status } = req.body.job;

  if (!position || !company || !location || !type || !status) {
    return res.status(409).send({ msg: "Please fill in all fields" });
  }

  try {
    const jobs = await Job.findOne({ user: req.userId });
    const index = jobs.jobs.map((job) => job._id.toString()).indexOf(id);

    console.log(index);

    jobs.jobs[index].position =
      position.charAt(0).toUpperCase() + position.slice(1);
    jobs.jobs[index].company = company;
    jobs.jobs[index].location = location;
    jobs.jobs[index].type = type;
    jobs.jobs[index].status = status;

    await jobs.save();

    return res.status(201).send({ jobs: jobs.jobs });
  } catch (error) {
    return res.status(500).send({ msg: "server error" });
  }
});

router.delete("/:jobId", CheckAuth, async (req, res) => {
  const { jobId } = req.params;

  console.log(jobId);

  try {
    const jobs = await Job.findOne({ user: req.userId });

    const index = jobs.jobs.map((job) => job._id.toString()).indexOf(jobId);

    console.log(index);

    jobs.jobs.splice(index, 1);

    await jobs.save();

    const totalJobs = jobs.jobs.length;

    const NumOfPages = Math.ceil(totalJobs / 10);

    return res
      .status(201)
      .send({ jobs: jobs.jobs, NumOfPages: NumOfPages, totalJobs: totalJobs });
  } catch (error) {
    return res.status(500).send({ msg: "server error" });
  }
});

router.post("/createJob", CheckAuth, async (req, res) => {
  const { position, company, location, type, status } = req.body;

  if (!position || !company || !location || !type || !status) {
    return res.status(409).send({ msg: "Please fill in all fields" });
  }

  try {
    const existing = await Job.findOne({ user: req.userId });

    let jobs;

    const Position = position.charAt(0).toUpperCase() + position.slice(1);
    if (existing) {
      const newArr = [
        {
          position: Position,
          company,
          location,
          status,
          type,
        },
      ].concat(existing.jobs);

      existing.jobs = newArr;

      await existing.save();

      jobs = existing.jobs;
    } else {
      const newJob = new Job({
        user: req.userId,
        jobs: [],
      });

      const Position = position.charAt(0).toUpperCase() + position.slice(1);
      const newArr = [
        {
          position: Position,
          company,
          location,
          status,
          type,
        },
      ].concat(newJob.jobs);

      newJob.jobs = newArr;

      await newJob.save();

      jobs = newJob.jobs;
    }

    return res.status(201).send({ jobs: jobs });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "server error" });
  }
});

module.exports = router;
