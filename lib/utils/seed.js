const Post = require("../models/Post");
const User = require("../models/User")
const Comment = require("../models/Comment")

module.exports = async () => { 

    await User.insert({
        username: 'John Doe',
        photo: "www.github.com/johnphoto"
    })
    await User.insert({
        username: 'Jane Doe',
        photo: "www.github.com/janephoto"
    })
    await User.insert({
        username: 'Brenda Splenda',
        photo: "www.github.com/brendaphoto"
    })

    await Post.insert({
        userName: 'John Doe',
        caption: "A picture of me in a house with a rock",
        photoUrl: "www.images.com/cave",
        tags: ['house life', 'bhouseats', 'rock']
    });
    await Post.insert({
        userName: 'John Doe',
        caption: "A picture of me on a boat with a broom",
        photoUrl: "www.images.com/broom",
        tags: ['broom life', 'broomers', 'sweepin']
    });
    await Post.insert({
        userName: 'John Doe',
        caption: "A picture of me in a swimming with a seal",
        photoUrl: "www.images.com/seal",
        tags: ['seal life', 'seals are real', 'slippery']
    });
    await Post.insert({
        userName: 'John Doe',
        caption: "A picture of me in the woods with a bear",
        photoUrl: "www.images.com/bear",
        tags: ['bear life', 'bear love', 'big claws']
    });
    await Post.insert({
        userName: 'John Doe',
        caption: "A picture of me in a room with a lizard",
        photoUrl: "www.images.com/lizard",
        tags: ['lizard life', 'scale mail', 'cold blood']
    });
    await Post.insert({
        userName: 'Jane Doe',
        caption: "A picture of a whale",
        photoUrl: "www.images.com/whale",
        tags: ['whale', 'underwater', 'swimming']
    });
    await Post.insert({
        userName: 'Brenda Splenda',
        caption: "Me out and about with my girlies",
        photoUrl: "www.images.com/night",
        tags: ['night out with the girls', 'party', 'hungover']
    });
    await Post.insert({
        userName: 'Jane Doe',
        caption: "A picture of a cat",
        photoUrl: "www.images.com/cat",
        tags: ['cats', 'cat lady', 'claws']
    });
    await Post.insert({
        userName: 'Brenda Splenda',
        caption: "Me out and about with my best friend",
        photoUrl: "www.images.com/friend",
        tags: ['night out with my friend', 'wicked wasted', 'bump my head']
    });
    await Post.insert({
        userName: 'Jane Doe',
        caption: "A picture of a sock",
        photoUrl: "www.images.com/sock",
        tags: ['i need socks', 'dirty socks', 'smelly feet']
    });
    await Post.insert({
        userName: 'Brenda Splenda',
        caption: "So hungry",
        photoUrl: "www.images.com/food",
        tags: ['yummy food', 'ingredients', 'kale']
    });

    await Comment.insert({
        commentBy: 'John Doe',
        postId: 1,
        comment: "This photo is so nasty"
    })

    await Comment.insert({
        commentBy: 'John Doe',
        postId: 10,
        comment: "This photo is so sad"
    })

    await Comment.insert({
        commentBy: 'John Doe',
        postId: 5,
        comment: "This photo is so weird"
    })

    await Comment.insert({
        commentBy: 'Jane Doe',
        postId: 1,
        comment: "This photo is so blurry"
    })

    await Comment.insert({
        commentBy: 'Jane Doe',
        postId: 2,
        comment: "This photo is so upsidedown"
    })

    await Comment.insert({
        commentBy: 'Jane Doe',
        postId: 2,
        comment: "This photo is so scary"
    })

    await Comment.insert({
        commentBy: 'Brenda Splenda',
        postId: 7,
        comment: "Love this Photo!"
    })
    await Comment.insert({
        commentBy: 'Brenda Splenda',
        postId: 4,
        comment: "Hate this Photo!"
    })
    await Comment.insert({
        commentBy: 'Brenda Splenda',
        postId: 1,
        comment: "Need this Photo!"
    })

    await Comment.insert({
        commentBy: 'John Doe',
        postId: 10,
        comment: "This photo is so goopy"
    })

    await Comment.insert({
        commentBy: 'John Doe',
        postId: 2,
        comment: "This photo is so slimy"
    })

    await Comment.insert({
        commentBy: 'John Doe',
        postId: 1,
        comment: "This photo is so mean"
    })
}