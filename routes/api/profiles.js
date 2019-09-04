const express = require('express');
const router = express.Router();
const passport = require('passport');

const profile = require('../../model/profile');

/* 
@ route POST api/profiles/add
@ desc 添加信息接口
@ access Private
*/
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  const profileFields = {};
  if (req.body.type) profileFields.type = req.body.type;
  if (req.body.describe) profileFields.describe = req.body.describe;
  if (req.body.income) profileFields.income = req.body.income;
  if (req.body.cash) profileFields.cash = req.body.cash;
  if (req.body.expend) profileFields.expend = req.body.expend;
  if (req.body.remark) profileFields.remark = req.body.remark;
  if (req.body.date) profileFields.date = req.body.date;
  new profile(profileFields).save().then(profileRes => {
    res.json(profileRes)
  })
})

/* 
@ route GET api/profiles/
@ desc 获取所有信息接口
@ access Private
*/
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  profile.find()
    .then(profiles => {
      if (!profiles) {
        return res.status(404).json('没有任何内容');
      }
      res.json(profiles)
    })
    .catch(err => res.status(404).json(err));
})

/* 
@ route GET api/profiles/:id
@ desc 获取单个信息
@ access Private
*/
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  profile.findOne({ _id: req.params.id })
    .then(profiles => {
      if (!profiles) {
        return res.status(404).json('没有任何内容');
      }
      res.json(profiles)
    })
    .catch(err => res.status(404).json(err));
})

/* 
@ route POST api/profiles/edit
@ desc 编辑信息
@ access Private
*/
router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const profileFields = {};
  if (req.body.type) profileFields.type = req.body.type;
  if (req.body.describe) profileFields.describe = req.body.describe;
  if (req.body.income) profileFields.income = req.body.income;
  if (req.body.cash) profileFields.cash = req.body.cash;
  if (req.body.expend) profileFields.expend = req.body.expend;
  if (req.body.remark) profileFields.remark = req.body.remark;
  if (req.body.date) profileFields.date = req.body.date;
  profile.findOneAndUpdate({ _id: req.params.id }, { $set: profileFields }, { new: true })
    .then(profiles => {
      res.json(profiles);
    })
    .catch(err => res.status(404).json(err))
})

/* 
@ route POST api/profiles/delete
@ desc 删除信息
@ access Private
*/
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  profile.findOneAndRemove({ _id: req.params.id })
    .then(result => {
      if (result) {
        res.status(200).json('删除成功');
      }
    })
    .catch(err => {
      res.status(404).json(err);
    })
})
module.exports = router