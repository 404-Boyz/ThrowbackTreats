
const Sequelize = require('sequelize');
const Promise = require('bluebird');
const { User, Order, Product, Category, Review, Cart, Cart_products, Order_products } = require('./server/db/models');
const db = require('./server/db');


const categories = [
    {
        title: 'food'
    },
    {
        title: 'drink'
    },
    {
        title: 'novelty'
    }
];

const products = [
    {
        title: "Push-Pops",
        description: "Push Pops are the classic candies enclosed in a plastic tube – just push up to enjoy the sweet flavor of the candy, or push down and cap it to save it for later.",
        price: 1.00,
        inventoryQuantity: 50,
        photoUrl: "/img/food/food-pushpops.png",
        categoryId: 1
    },
    {
        title: "Pop Rocks",
        description: "A candy that creates a small popping reaction when it dissolves in one's mouth.",
        price: 1.50,
        inventoryQuantity: 150,
        photoUrl: "/img/food/food-poprocks.png",
        categoryId: 1
    },
    {
        title: "Candy Cigarettes",
        description: "A candy introduced in the early 20th century made out of chalky sugar, bubblegum or chocolate, wrapped in paper as to resemble cigarettes. Some products contain powdered sugar hidden in the wrapper, allowing the user to blow on the cigarette and produce smoke on the other end. ",
        price: 4.00,
        inventoryQuantity: 150,
        photoUrl: "/img/food/food-targetcigs.png",
        categoryId: 1
    },
    {
        title: "Hydrox",
        description: "a creme-filled chocolate sandwich cookie manufactured by Leaf Brands. It debuted in 1908, and was manufactured by Sunshine Biscuits for over ninety years.",
        price: 8.00,
        inventoryQuantity: 150,
        photoUrl: "/img/food/food-hydrox.png",
        categoryId: 1
    },
    {
        title: "Jawbreakers",
        description: "A hard candy of various sizes with multiple layers. Great for licking, jawbreakers are sure to keep your taste buds occupied for hours.",
        price: 2.99,
        inventoryQuantity: 500,
        photoUrl: "/img/food/food-jawbreaker.png",
        categoryId: 1
    },
    {
        title: "Dunkaroos",
        description: "A snack-sized package containing cookies and icing; the cookies are meant to be dunked into the icing before eating.",
        price: 4.00,
        inventoryQuantity: 150,
        photoUrl: "/img/food/food-dunkaroos.png",
        categoryId: 1
    },
    {
        title: "Squeezit",
        description: "A fruit-flavored juice that comes in a plastic bottle that the drinker has to squeeze in order to extract the beverage from its container, hence the name.",
        price: 5.99,
        inventoryQuantity: 150,
        photoUrl: "/img/drink/drink-squeezit.png",
        categoryId: 2
    },
    {
        title: "Jolt",
        description: "Jolt Cola is a carbonated soft drink produced by The Jolt Company, Inc. The cola drink was created in 1985 by C. J. Rapp as a highly caffeinated beverage.",
        price: 8.75,
        inventoryQuantity: 150,
        photoUrl: "/img/drink/drink-jolt.png",
        categoryId: 2
    },
    {
        title: "Pepsi Crystal",
        description: "A soft drink made by PepsiCo. It was first sold in Europe in the early 1990s. It is like regular Pepsi, but it's clear",
        price: 1.99,
        inventoryQuantity: 150,
        photoUrl: "/img/drink/drink-crystalpepsi.png",
        categoryId: 2
    },
    {
        title: "New Coke",
        description: "New Coke was the unofficial name for the reformulation of Coca-Cola introduced in April 1985 by the Coca-Cola Company to replace the original formula of its flagship soft drink, Coca-Cola.",
        price: 1.99,
        inventoryQuantity: 150,
        photoUrl: "/img/drink/drink-newcoke.png",
        categoryId: 2
    },
    {
        title: "Surge",
        description: "Surge is a citrus flavored soft drink first produced in the 1990s by The Coca-Cola Company to compete with Pepsi's Mountain Dew.",
        price: 3.99,
        inventoryQuantity: 150,
        photoUrl: "/img/drink/drink-surge.png",
        categoryId: 2
    },
    {
        title: "4 Loko",
        description: "Blackout in a Can",
        price: 5.00,
        inventoryQuantity: 500,
        photoUrl: "/img/drink/drink-fourloko.png",
        categoryId: 2
    },
    {
        title: "Mad Dog 20/20",
        description: "As majestic as the cascading waters of a drain pipe, Mad Dog 20/20 is a wine that is a top choice of bums nationwide",
        price: 19.99,
        inventoryQuantity: 230,
        photoUrl: "/img/drink/drink-md2020.png",
        categoryId: 2
    },
    {
        title: "Sparks",
        description: "An alcoholic beverage that debuted in the US market in 2002. The original formulation contained caffeine, one of the first alcoholic beverages to do so.",
        price: 12.00,
        inventoryQuantity: 35,
        photoUrl: "/img/drink/drink-sparks.png",
        categoryId: 2
    },
    {
        title: "Zima",
        description: "A clear, lightly carbonated alcoholic beverage, that was made and distributed by the Coors Brewing Company.",
        price: 7.99,
        inventoryQuantity: 58,
        photoUrl: "/img/drink/drink-zima.png",
        categoryId: 2
    },
    {
        title: "Crossfire",
        description: "A board game created by the Milton Bradley Company in 1971. The object of the game is to score goals by pushing one of the two pucks into the opposing player's goal. This task is accomplished by shooting small metal ball bearings at the pucks using the attached guns.",
        price: 18.99,
        inventoryQuantity: 65,
        photoUrl: "/img/novelty/novelty-crossfire.png",
        categoryId: 3
    },
    {
        title: "Thin Ice",
        description: "This breakthrough game is a real icebreaker for kids! Take a marble from the water channel and place it on the tissue. DON'T be holding the tweezers when the marbles break through!",
        price: 12.00,
        inventoryQuantity: 45,
        photoUrl: "/img/novelty/novelty-thinice.png",
        categoryId: 3
    },
    {
        title: "Careers",
        description: "Careers is a board game first manufactured by Parker Brothers in 1955 for $2.97 US, and was most recently produced by Winning Moves Games. It was devised by the sociologist James Cooke Brown.",
        price: 2.97,
        inventoryQuantity: 5,
        photoUrl: "/img/novelty/novelty-careers.png",
        categoryId: 3
    },
    {
        title: "JNCO Jeans",
        description: "JNCO is the single most iconic wide-legged jean brand of all time. JNCO rose to international prominence in the 1990s on a reputation of well-made high-quality denim built to last, with attitude to match.",
        price: 49.99,
        inventoryQuantity: 650,
        photoUrl: "/img/novelty/novelty-jnco.png",
        categoryId: 3
    },
    {
        title: "Jarts",
        description: "A lawn game for two players or teams. A lawn dart set usually includes four large darts and two targets. The game play and objective are similar to both horseshoes and darts.",
        price: 32.00,
        inventoryQuantity: 45,
        photoUrl: "/img/novelty/novelty-jarts.png",
        categoryId: 3
    },
    {
        title: "Mousetrap",
        description: "Snap the trap and win at Mousetrap! Run through the maze as Sneakers Mouse, Nacho Mouse or Pepper Mouse spins on the cheesy spinner. When one of your friends' mouse is in the cheesy trap area and you land on the right space, you've got a chance to catch them in the zany trap.",
        price: 13.99,
        inventoryQuantity: 99,
        photoUrl: "/img/novelty/novelty-mousetrap.png",
        categoryId: 3
    },
    {
        title: "Tamagotchi",
        description: "A handheld digital pet, created in Japan by Akihiro Yokoi (ja) of WiZ and Aki Maita of Bandai. It was released by Bandai on November 23, 1996 in Japan and May 1997 in the rest of the world, quickly becoming one of the biggest toy fads of the 1990s and early 2000s.",
        price: 9.99,
        inventoryQuantity: 260,
        photoUrl: "/img/novelty/novelty-tamagotchi.png",
        categoryId: 3
    },
    {
        title: "Skip-it",
        description: "An apparatus that was designed to be affixed to the child's ankle via a small plastic hoop and spun around in a 360 degree rotation while continuously skipped by the user.",
        price: 24.99,
        inventoryQuantity: 260,
        photoUrl: "/img/novelty/novelty-skipit.png",
        categoryId: 3
    },
    {
        title: "Beanie Babies",
        description: "A line of stuffed animals created by Ty Warner, the man who founded Ty Inc. The toys are unique because each toy is stuffed with plastic pellets rather than conventional soft stuffing, giving Beanie Babies a more flexible feel.",
        price: 5000.00,
        inventoryQuantity: 1,
        photoUrl: "/img/novelty/novelty-beaniebabies.png",
        categoryId: 3
    }
];

const users = [
    {
        name: 'Nostalgic Nick',
        email: '1990nick@aol.com',
        password: 'fullhouse',
        googleID: 'askjeeves',
        isAdmin: false,
    },
    {
        name: 'Webmaster Whit',
        email: 'god@throwback.com',
        password: 'bartertown',
        googleID: 'webcrawler',
        isAdmin: true,
    },
    {
        name: 'Radical Ryan',
        email: 'ryguy@aol.com',
        password: 'ryan1',
        googleID: 'ryanDuh',
        isAdmin: false,
    },
    {
        name: 'Awesome Anna',
        email: 'anna@hotmail.com',
        password: 'anna1',
        googleID: 'annaBanana',
        isAdmin: false,
    }
];

const reviews = [
    {
        title: 'Push It!',
        description: 'Push pops are blowing my mind! I could have a million of these a day. Seriously.',
        rating: 4,
        userId: 2,
        productId: 1
    },
    {
        title: 'Cant Stop Popping',
        description: 'My mouth is having a party right now. A pop rock party.',
        rating: 5,
        userId: 2,
        productId: 2
    },
    {
        title: 'Puff Puff Pass?',
        description: 'Who doesnt want to pretend like they are an adult as a child?',
        rating: 5,
        userId: 3,
        productId: 3
    },
    {
        title: 'Is this a chemical or a cookie?',
        description: 'Seriously? I have no idea, but I love them either way.',
        rating: 2,
        userId: 4,
        productId: 4
    },
    {
        title: 'Whoa Baby!',
        description: 'Have you ever tasted anything so delicious? I dont think so!',
        rating: 5,
        userId: 3,
        productId: 6
    },
    {
        title: 'Delicious in a Can',
        description: 'So much caffeine, so little time.',
        rating: 4,
        userId: 1,
        productId: 8
    },
    {
        title: 'This is Loco!',
        description: 'I dont remember anything after my first sip. Worth it!',
        rating: 3,
        userId: 4,
        productId: 12
    },
    {
        title: 'Juggalo for Life!',
        description: 'Dont mess with the best - these jeans will never be bested!',
        rating: 4,
        userId: 1,
        productId: 18
    },
    {
        title: 'Lorem Ipsum!',
        description: 'Lorem ipsum dolor sit amet, etiam diceret id mel, id accumsan pertinacia eam. Id mei illud dictas volutpat, mea vivendo iudicabit democritum ei',
        rating: 1,
        userId: 2,
        productId: 18
    },
    {
        title: 'Totally Radical!',
        description: 'This is the coolest product that I have ever used! I love these!',
        rating: 4,
        userId: 4,
        productId: 20
    },
    {
        title: 'Take My Money!',
        description: '$5000 was a little much, but who really cares rigt? Beanie babies are worth every penny of my savings!',
        rating: 5,
        userId: 2,
        productId: 24
    },
    {
        title: 'Lorem Ipsum!',
        description: 'Lorem ipsum dolor sit amet, etiam diceret id mel, id accumsan pertinacia eam. Id mei illud dictas volutpat, mea vivendo iudicabit democritum ei',
        rating: 3,
        userId: 1,
        productId: 24
    }

];

const carts = [
    {
        sessionId: 'latenight',
        userId: 1
    },
    {
        sessionId: 'manicshopper',
        userId: 2
    }
];

const cart_products = [
    {
        quantity: 3,
        status: 'open',
        cartId: 1,
        productId: 14
    },
    {
        quantity: 2,
        status: 'removed',
        cartId: 2,
        productId: 8
    },
    {
        quantity: 2,
        status: 'open',
        cartId: 1,
        productId: 20
    }
];

const order_products = [
    {
        quantity: 3,
        price: 2.99,
        cartId: 1,
        productId: 19,
        orderId: 1
    },
    {
        quantity: 4,
        price: 6.99,
        cartId: 1,
        productId: 14,
        orderId: 3
    },
    {
        quantity: 1,
        price: 99.99,
        cartId: 2,
        productId: 6,
        orderId: 2
    },
    {
        quantity: 2,
        price: 8.99,
        cartId: 2,
        productId: 8,
        orderId: 2
    },
    {
        quantity: 15,
        price: 2.99,
        cartId: 2,
        productId: 1,
        orderId: 2
    }
]

const orders = [
    {
        price: 500.03,
        status: 'processing',
        userId: 1
    },
    {
        price: 50.05,
        status: 'created',
        userId: 2
    },
    {
        price: 68.33,
        status: 'completed',
        userId: 3
    },
    {
        price: 400.99,
        status: 'completed',
        userId: 1
    },
    {
        price: 11.99,
        status: 'completed',
        userId: 2
    },

];

const seed = () =>
    Promise.all(categories.map(category =>
        Category.create(category))
    )
        .then(() =>
            Promise.all(products.map(product =>
                Product.create(product))
            ))
        .then(() =>
            Promise.all(users.map(user =>
                User.create(user))
            )
        )
        .then(() =>
            Promise.all(carts.map(cheese =>
                Cart.create(cheese))
            )
        )
        .then(() =>
            Promise.all(cart_products.map(cart_product =>
                Cart_products.create(cart_product))
            )
        )
        .then(() =>
            Promise.all(orders.map(order =>
                Order.create(order))
            )
        )
        .then(() =>
            Promise.all(order_products.map(order_product =>
                Order_products.create(order_product))
            )
        )
        .then(() =>
            Promise.all(reviews.map(review =>
                Review.create(review))
            )
        )

const main = () => {
    console.log('Syncing db...');
    db.sync({ force: true })
        .then(() => {
            console.log('Seeding databse...');
            return seed();
        })
        .catch(err => {
            console.log('Error while seeding');
            console.log(err.stack);
        })
        .then(() => {
            db.close();
            return null;
        });
};

main();
