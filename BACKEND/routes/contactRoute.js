const router = require('express').Router();
const Contact = require('../models/contacts');
const { ObjectId } = require('mongoose').Types;

router.route('/add').post((req, res) => {
    console.log('Request Body:', req.body);
      const {
          name,
          email,
          subject,
          massage
   
      } = req.body;
  
      const newContact = new Contact({
        _id: new ObjectId(),
        name,
        email,
        subject,
        massage
      });
      console.log(newContact)
      newContact.save()
          .then(() => res.json(newContact))
          .catch(err => {
              console.error(err);
              res.status(500).send('Error adding Feedback');
          });
  });
  
  router.route('/').get((req, res) => {
    Contact.find() .then((contacts) => {
            res.json(contacts); 
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error retrieving contacts');
        });
});

router.route("/update/:id").put(async (req, res) => {
    try {
        console.log(req.body.reply)
      const con = await Contact.findByIdAndUpdate(
        req.params.id,
        { $set: { reply: req.body.reply } },
        { new: true } // Return the updated document
      );
      if (!con) {
        return res.status(404).json({ error: "Contact not found" });
      }
      res.json({ message: "Contact updated successfully", con });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  });
  
  router.route("/delete/:id").delete(async (req, res) => {
    try {
      const con = await Contact.findByIdAndDelete(req.params.id);
      if (!con) {
        return res.status(404).json({ error: "Feedback not found" });
      }
      res.json({ message: "Feedback deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  });


module.exports = router;