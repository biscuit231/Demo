const router = require('express').Router();
const { Posts, Users} = require('../models');
//const withAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Posts.findAll({
          include: [
            {
                model: Users,
                attributes: ['user_name'],
            },
          ],
});

        const posts = postData.map((post) => post.get({ plain: true }));

    
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        } );

    } catch (err) {
        res.status(500).json(err);
    }
    })



//get posts by pk
router.get('/posts/:id', async (req, res) => {
    try {
        const postData = await Posts.findByPk(req.params.id);
        const post = postData.get({ plain: true });
   
        res.render('post', {
            post, 
            logged_in: req.session.logged_in
        });
        req.session.save(() => {
            req.session.postId = req.params.id;
        })
        
    } catch (err) { 
        res.status(500).json(err);
    }
});


  module.exports = router;