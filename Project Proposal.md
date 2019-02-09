## <span>  
</span><span>Vision Statement</span>

<span>Coherent Chaos is a game that will bring excitement back to checkers, reinvigorating it with new confounding rules and ideas that will twist your mind. It will provide entertainment to players of all age groups and an experience to be remembered.</span>

## <span>Motivation</span>

<span>Coherent Chaos is inspired by checkers. With simple bi-directional movement per game piece, it’s one of the first board games many children in North America learn to play. However, its simplicity heavily limits its potential of being played long into players’ lives. This is because players quickly develop strategies and games become monotonous. We want to create a checkers-like game that solves this problem by introducing new gameplay mechanics.</span><span> </span><span>To achieve this, we will employ a less common</span><span>concept of hexagonal checkers, which allows for a larger variety of movement options and therefore more diverse strategies than those in a standard checkers grid. The most unique twist to the game is a battle royale aspect, which creates a fun challenge that’s sure to keep players interested. A built-in message system will also allow for quick social interaction.</span> <span>This hexagonal board coupled with fresh gameplay elements makes Coherent Chaos a more entertaining, and thus superior product to other competing online board games. The game’s movement simplicity coupled with interesting twists will enable continued enjoyment long into the future.</span>

## <span class="c2">Success Criteria</span>

<span class="c0">Coherent Chaos will be considered a success if the following criteria are met:</span>

*   <span class="c0">Within the first 3 months of its release, 80% of games started are played to completion.</span>
*   <span class="c0">Its mobile clients receive ratings of 3.5 / 5 or greater in their respective app stores.</span>
*   <span class="c0">Monthly app installs are greater than 10 on each mobile platform.</span>
*   <span>The number of</span> <span>games started monthly exceed 20</span><span class="c0"> across all platforms.</span>

## <span class="c2">Technologies</span>

### <span>Server</span><span class="c12">: AWS (Amazon Web Services)</span>

<span class="c0">Amazon is a massive cloud services provider, and AWS is industry standard. There’s a plethora of support and resources available online. It’s also the default for this course, meaning there will be many other people available to ask for help when required. It also offers a free-tier that spans the length of this course and offers resources that should be sufficient for our needs.</span>

<span class="c0"></span>

<span class="c0">Multiple Amazon accounts will be used to take advantage of this free tier, hosting a Production version of the server along with several Development versions.</span>

### <span class="c12">Languages: JavaScript + Node, Dart</span>

<span>JavaScript is an extremely versatile major web language with unbelievable reach as one of the most widely used and demanded languages in the industry. As such, it has countless resources and examples available online</span> <span>(Most popular language, Stack Overflow 2018)</span><span class="c0">. Additionally, some team members already know JavaScript and can share knowledge to reduce the learning curve for other team members. It will also be used on the frontend, further reducing learning overhead. Node will be used to run standalone JavaScript, and npm will be used as it offers an immense ecosystem of useful modules.</span>

<span class="c0"></span>

<span>Dart is</span> <span>a C-like programming language optimized for client-side development for web and mobile. The decision to use this language revolved primarily around the decision to use Flutter, as a mobile client technology for building native apps, which requires the use of Dart. Additionally, we decided to learn a new framework and language. Dart (and Flutter) meet these criteria and while it isn’t the fastest rising in terms of popularity, Google’s Flutter framework and Fuchsia operating system both use Dart, indicating that is here to stay (Google created the Dart language). Tutorials and API reference on the language’s official website serve as a useful resource to get team members up to speed with the language. Previous C language experience amongst team members is also useful.</span>

### <span class="c12">Backend Web Framework: Express</span>

<span class="c0">Express is a widely used, simple and lightweight web framework. It’s over eight years old, is stable and well supported, has many resources and examples available online, and also has industry relevance beyond school. The lightweight nature of Express also offers excellent flexibility when it comes to backend design.</span>

<span class="c0"></span>

<span class="c0">The Express backend will serve as both the game API and the server for the web client. For example, the app will be accessed at game.com/, and the API will be accessed at game.com/api/. Express makes routing easy, so doing this is very simple.</span>

### <span class="c12">Web Client: React</span>

<span class="c0">React is written in JavaScript, the same language as the backend. This reduces the amount of technology the team needs to learn in addition to all of the benefits of JavaScript as a language mentioned previously.</span>

<span class="c0"></span>

<span class="c0">React is a powerful library for creating dynamic, interactable page components, and allows for their reuse across the entire app, reducing development time and improving developer quality of life by making component sandboxing for development purposes painless through utilities such as Styleguidist. React is widely used with lots of support, references, and resources available, and has practical application beyond school in a variety of web development oriented positions. Some members on the team also have experience with it, which will reduce the learning curve for everyone else, and reduce project startup time.</span>

<span class="c0"></span>

<span class="c0">React will be coupled with Redux and Redux-Saga for clean application state and async request management, and the React Container Pattern will be used to separate functional components from presentational components. This pattern dictates that container components will manage state, data, and requests, and pass everything down the hierarchy to components that then present the state and data they’re given. Doing this will make development completely modular and will keep responsibility on the frontend under control, keeping code clean and understandable.</span>

### <span>Mobile Clients (iOS + Android):</span> <span>Flutter</span>

<span class="c0"></span>

<span>Flutter is a framework that uses the C-like Dart programming language, which team members will find familiar. As a new framework, Flutter is valuable to learn as it is widely used in the industry and has lots of support in the form of online resources, tutorials and examples. It is developer friendly with its large quantity of different built-in widgets for developing expressive and beautiful apps. It is also a cross platform framework which decreases the amount of work required for mobile clients, since the same code works on both the iOS and Android platforms. It can be set up easily by installing an editor</span> <span>plugin</span><span class="c0">.</span>

## <span class="c2">User Stories</span>

1.  <span>As a player, I want to be able to</span> <span>start</span> <span class="c0">a game so that I can play the game.</span>

*   <span class="c0">Estimate: 4 days</span>
*   <span class="c0">Priority: High</span>

<span class="c0"></span>

1.  <span class="c0">As a player, I want to be able to join a game so that I can play against an opponent.</span>

*   <span class="c0">Estimate: 8 days</span>

*   <span class="c0">Priority: High</span>

<span class="c0"></span>

1.  <span class="c0">As a player, I want to be able to make moves on the game board so that I can play out my strategies.</span>

*   <span class="c0">Estimate: 12 days</span>

*   <span class="c0">Priority: High</span>

<span class="c0"></span>

1.  <span>As a player, I want to be able to take turns with my opponent</span> <span>so that we can develop strategies to win the game.</span>

*   <span class="c0">Estimate: 3 days</span>

*   <span class="c0">Priority: High</span>

<span class="c0"></span>

1.  <span>As a player, I want to know when I’ve won or lost the game so that I know when the game is over.</span>

*   <span class="c0">Estimate: 1 day</span>

*   <span>Priority:</span> <span class="c0">Medium</span>

<span class="c0"></span>

1.  <span class="c0">As a player, I want to save my game progress, so that I can continue the game in the future.</span>

*   <span class="c0">Estimate: 1 day</span>

*   <span>Priority:</span> <span>Low</span>

## <span class="c2">Links</span>

<span class="c0">Repository:</span>

<span class="c15">[https://github.com/ZackHJ/comp4350-project](https://www.google.com/url?q=https://github.com/ZackHJ/comp4350-project&sa=D&ust=1549748379891000)</span>

<span class="c0"></span>

<span class="c0">Issue Board (tracking system):</span>

<span>        </span><span class="c15">[https://github.com/ZackHJ/comp4350-project/projects](https://www.google.com/url?q=https://github.com/ZackHJ/comp4350-project/projects&sa=D&ust=1549748379891000)</span>

## <span class="c2">Group C</span>

*   <span class="c0">Chiragkumar Prajapati (Chirag)</span>
*   <span class="c0">Connor Lowey</span>
*   <span class="c0">Hui Jin (Zack)</span>
*   <span class="c0">Huizi Hao</span>
*   <span class="c0">Casey Hildebrand</span>
*   <span class="c0">Piklu Sutradhar</span>
*   <span class="c0">Zhikan Xu (Jason)</span>
*   <span class="c0">Tyler Garrow</span>