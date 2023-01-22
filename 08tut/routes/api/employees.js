const express = require('express');
const router = express.Router();
const path = require('path');
const data = {};
data.employess = require('../../data/employees.json');


/* it just example 
실제 에이피아이는 절대 이렇게 안하지만
예시로 보여주기 위해서 ㅋㅋ*/
router.route('/')
	.get((req, res) => {
		res.json(data.employess);
	})
	.post((req, res) => {
		res.json({
			"firstname" : req.body.firstname,
			"lastname" : req.body.lastname
		});
	})
	.put((req, res) => {
		res.json({
			"firstname" : req.body.firstname,
			"lastname" : req.body.lastname
		});
	})
	.delete((req, res) => {
		res.json({ "id": req.body.id })
	});


router.route('/:id')
	.get((req, res) => {
		res.json({ "id": req.params.id })
	});
module.exports = router;
