// routes/feedbacks.js

const router = require('express').Router();
const Feedback = require('../models/Feedback');
const { ObjectId } = require('mongoose').Types;


router.route('/add').post((req, res) => {
  console.log('Request Body:', req.body);
    const {
        name,
        email,
        duration,
        howDidYouHear,
        quality,
        cleanliness,
        food,
        staff,
        suggestions ,
        rating
    } = req.body;

    const newFeedback = new Feedback({
      _id: new ObjectId(),
        name,
        date: new Date(),
        email,
        duration,
        howDidYouHear,
        quality,
        cleanliness,
        food,
        staff,
        suggestions,
        rating
    });
    newFeedback.save()
        .then(() => res.json(newFeedback))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error adding Feedback');
        });
});


router.route("/").get((req, res) => {
    Feedback.find().then((feedbacks) => {
        res.json(feedbacks);
      console.log("sssssssssssssssssssssssssss"+feedbacks)
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Error fetching Feedback");
    });
});





router.route("/update/:id").put(async (req, res) => {
    try {
      const feedback = await Feedback.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!feedback) {
        return res.status(404).json({ error: "Feedback not found" });
      }
      res.json({ message: "Feedback updated successfully", feedback });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  });
  
  router.route("/delete/:id").delete(async (req, res) => {
    try {
      const feedback = await Feedback.findByIdAndDelete(req.params.id);
      if (!feedback) {
        return res.status(404).json({ error: "Feedback not found" });
      }
      res.json({ message: "Feedback deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  });

  router.route("/get/:id").get(async (req, res) => {
    try {
      const feedback = await Feedback.findById(req.params.id);
      if (!feedback) {
        return res.status(404).json({ error: "Feedback not found" });
      }
      res.json(feedback);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  });

module.exports = router;
