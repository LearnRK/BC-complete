const express = require("express");
const { Data } = require("./db");

const router = express.Router();
router.use(express.json());

router.get("/startYear", async (req, res) => {
  try {
    const data = await Data.find();
    const startYearData = {};

    // start year json
    data.map((d) => {
      let year = d.start_year;

      if (year == null) year = 0;

      if (!startYearData[year]) {
        startYearData[year] = 1;
      } else {
        startYearData[year] += 1;
      }
    });

    const result = [];
    for (let x in startYearData) {
      // console.log(JSON.parse(`{"${x}" : "${startYearData[x]}"}`));
      // result.push(JSON.parse(`{"name" : "${x}" , "value" : ${startYearData[x]}}`));
      // console.log(JSON.parse(`{"name" : "${x}" , "value" : ${startYearData[x]}}`));

      if (x != 0) {
        const tempJson = { x: parseInt(x), y: startYearData[x] };
        result.push(tempJson);
      }
    }

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.get("/endYear", async (req, res) => {
  try {
    const data = await Data.find();
    const endYearData = {};

    // start year json
    data.map((d) => {
      let year = d.end_year;

      if (year == null) year = "N/A";

      if (!endYearData[year]) {
        if (year > 2050);
        else endYearData[year] = 1;
      } else {
        endYearData[year] += 1;
      }
    });

    const result = [];
    for (let x in endYearData) {
      // console.log(JSON.parse(`{"${x}" : "${endYearData[x]}"}`));
      // result.push(JSON.parse(`{"${x}" : "${endYearData[x]}"}`));

      if (x != 0) {
        const tempJson = { x: parseInt(x), y: endYearData[x] };
        result.push(tempJson);
      }
    }

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.get("/topics", async (req, res) => {
  try {
    const data = await Data.find();
    const topicsData = {};

    data.map((d) => {
      //get all topics
      let topic = d.topic;

      //count all topics
      if (!topicsData[topic]) {
        topicsData[topic] = 1;
      } else {
        topicsData[topic] += 1;
      }
    });

    const result = [];
    for (let topic in topicsData) {
      const tempJson = { name: topic, value: topicsData[topic] };
      result.push(tempJson);
    }

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.get("/sector", async (req, res) => {
  try {
    const data = await Data.find();
    const sectordata = {};

    data.map((d) => {
      //get all sectors
      let sector = d.sector;

      //count all sectors
      if (!sectordata[sector]) {
        if (sector == "");
        else sectordata[sector] = 1;
      } else {
        sectordata[sector] += 1;
      }
    });

    const result = [];
    let otherCount = 0;

    for (let sector in sectordata) {
      if (sectordata[sector] < 10) otherCount++;
      else {
        const tempJson = { name: sector, value: sectordata[sector] };
        result.push(tempJson);
      }
    }
    if (otherCount > 0) {
      result.push({ name: "other", value: otherCount });
    }

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.get("/intensity", async (req, res) => {
  try {
    const data = await Data.find();
    const result = [];

    data.map((d) => {
      //get all topics
      let intensity = d.intensity;
      let year = d.start_year;

      if (year && intensity) {
        const tempJson = { x: year, y: intensity };
        result.push(tempJson);
      }
    });

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.get("/relevance", async (req, res) => {
  try {
    const data = await Data.find();
    const result = [];

    data.map((d) => {
      //get all topics
      let relevance = d.relevance;
      let year = d.start_year;

      if (year && relevance) {
        const tempJson = { name: year, value: relevance };
        result.push(tempJson);
      }
    });

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.get("/likelihood", async (req, res) => {
  try {
    const data = await Data.find();
    const result = [];

    data.map((d) => {
      //get all topics
      let likelihood = d.likelihood;
      let year = d.start_year;

      if (year && likelihood) {
        const tempJson = { x: year, y: likelihood };
        result.push(tempJson);
      }
    });

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.get("/country", async (req, res) => {
  try {
    const data = await Data.find();
    const countryData = {};

    data.map((d) => {
      //get all countrys
      let country = d.country;

      //count all countrys
      if (!countryData[country]) {
        if (country == "");
        else countryData[country] = 1;
      } else {
        countryData[country] += 1;
      }
    });

    const result = [];
    for (let country in countryData) {
      const tempJson = { name: country, value: countryData[country] };
      result.push(tempJson);
    }

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.get("/region", async (req, res) => {
  try {
    const data = await Data.find();
    const regionData = {};

    data.map((d) => {
      //get all regions
      let region = d.region;

      //count all regions
      if (!regionData[region]) {
        if (region == "" || region == "world");
        else regionData[region] = 1;
      } else {
        regionData[region] += 1;
      }
    });

    const result = [];
    let otherCount = 0;

    for (let region in regionData) {
      if (regionData[region] < 10) otherCount++;
      else {
        const tempJson = { name: region, value: regionData[region] };
        result.push(tempJson);
      }
    }
    if (otherCount > 0) {
      result.push({ name: "other", value: otherCount });
    }

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = { router };
