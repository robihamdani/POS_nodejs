const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

//  @route      POST api/admin
//  @desc       POST admin
//  @access     Private
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newAdmin = new Admin({
      name,
      email,
      password,
    });

    let admin = await Admin.findOne({ email });

    if (admin) {
      return res.status(400).send({ msg: 'email sudah terdaftar!' });
    }

    const salt = await bcrypt.genSalt(10);

    newAdmin.password = await bcrypt.hash(password, salt);

    newAdmin.save();

    res.json(newAdmin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//  @route      GET api/admin
//  @desc       GET all admin
//  @access     Private
router.get('/', async (req, res) => {
  try {
    const getAllAdmin = await Admin.find({});

    res.json(getAllAdmin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//  @route      GET api/admin
//  @desc       GET one admin
//  @access     Private
router.get('/:id', async (req, res) => {
  try {
    let contact = await Admin.findById(req.params.id);

    if (!contact) {
      return res.status(400).send({ msg: 'Admin tidak ditemukan' });
    }

    res.json({ contact });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//  @route      PUT api/admin
//  @desc       PUT change admin
//  @access     Private
router.put('/:id', async (req, res) => {
  try {
    let admin = await Admin.findById(req.params.id);

    const { name, email, password } = req.body;

    admin.set({ name, email, password });

    let result = await admin.save();
    res.send(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//  @route      delete api/admin
//  @desc       delete admin
//  @access     Private
router.delete('/:id', async (req, res) => {
  try {
    const deleteAdmin = await Admin.findByIdAndDelete(req.params.id);

    if (!deleteAdmin) {
      return res.status(400).send({ msg: 'Admin tidak ditemukan' });
    }

    res.json(deleteAdmin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

router.post('/test', async (req, res) => {
  try {
    const { email } = req.body;

    let admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).send('email tidak ditemukan');
    }

    res.json({ admin });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
