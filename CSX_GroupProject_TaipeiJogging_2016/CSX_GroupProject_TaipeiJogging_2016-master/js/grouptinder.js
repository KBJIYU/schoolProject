$('a[href*=#]').click(function(){
  return false;
});


var animationEndEvent = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";

var Person = {
  wrap: $('#people'),
  people: [
    {
      name: 'Jiyu',
      age: "<a target=\"_blank\" href=\"https://www.facebook.com/jiyu.huang.5\"><i class=\"fa fa-2x fa-facebook-official\"></i></a>",
      img: "./img/member_jiyu_01.jpg"
    },
    {
      name: 'Amanda',
      age: "<a target=\"_blank\" href=\"https://www.facebook.com/profile.php?id=100000444007981\"><i class=\"fa fa-2x fa-facebook-official\"></i></a>",
      img: "./img/member_amanda_01.jpg"
    },
    {
      name: 'Crea',
      age: "<a target=\"_blank\" href=\"https://www.facebook.com/shenghung.chang\"><i class=\"fa fa-2x fa-facebook-official\"></i></a>",
      img: "./img/member_crea_01.jpg"
    },
    {
      name: 'Ryan',
      age: "<a target=\"_blank\" href=\"https://www.facebook.com/CHENGYENRYAN\"><i class=\"fa fa-2x fa-facebook-official\"></i></a>",
      img: "./img/member_ryan_01.jpg"
    },
    {
      name: 'Shasta',
      age: "<a target=\"_blank\" href=\"https://www.facebook.com/thinkaholicc\"><i class=\"fa fa-2x fa-facebook-official\"></i></a>",
      img: "./img/member_shasta_01.jpg"
    },
    {
      name: 'Sunny',
      age: "<a target=\"_blank\" href=\"https://www.facebook.com/sunny.yang.5458\"><i class=\"fa fa-2x fa-facebook-official\"></i></a>",
      img: "./img/member_sunny_01.jpg"
    },
    {
      name: 'Hannah',
      age: "<a target=\"_blank\" href=\"https://www.facebook.com/profile.php?id=100002801051427\"><i class=\"fa fa-2x fa-facebook-official\"></i></a>",
      img: "./img/member_hannah_01.jpg"
    }
  ],
  add: function(){
    var random =     this.people[Math.floor(Math.random() * this.people.length)];
    this.wrap.append("<div class='person'><img alt='" + random.name + "' src='" + random.img + "' /><span><strong>" + random.age +"&nbsp&nbsp&nbsp&nbsp" + random.name + "</span></div>");
  }
}

var App = {
  yesButton: $('.button.yes .trigger'),
  noButton: $('.button.no .trigger'),
  blocked: false,
  like: function(liked){
    var animate = liked ? 'animateYes' : 'animateNo';
    var self = this;
    Person.add();
    if (!this.blocked) {
      this.blocked = true;
      $('.person').eq(0).addClass(animate).one(animationEndEvent, function() {
        $(this).remove();
        self.blocked = false;
      });
    }
  }
};

var Phone = {
  wrap: $('#phone'),
  clock: $('.clock'),
  updateClock: function() {
    var date = new Date();
    var hours = date.getHours();
    var min = date.getMinutes();
    hours = (hours < 10 ? "0" : "") + hours;
    min = (min < 10 ? "0" : "") + min;
    var str = hours + ":" + min;
    this.clock.text(str);
  }
}

App.yesButton.on('mousedown', function() {
  App.like(true);
});

App.noButton.on('mousedown', function() {
  App.like(false);
});

$(document).ready(function() {
  Person.people.forEach(function(person){
    new Image().src = person.img;
  });
  Phone.updateClock();
  setInterval('Phone.updateClock()', 1000);

  Person.add();
  Person.add();
  Person.add();
  Person.add();
});
