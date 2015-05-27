angular.module('starter.services', ['firebase'])

.factory('Disorder', function($firebaseArray){
  var loaded = false;
  var ref = new Firebase(firebaseUrl);
  var disorders = $firebaseArray(ref.child('disorders'));
  disorders.$loaded().then(function(x){
    loaded = true;
    console.log("cargado");
  }).catch(function(error){
    console.log("Error:",error);
  })

  return {
    all : function(){
      return disorders;
    },
    state : function(){
      return loaded;
    },
    delete : function(disorderId){
      var disorderToDelete = disorders.$getRecord(disorderId);
      disorders.$remove(disorderToDelete).then(function(ref){
        if(ref.key() === disorderToDelete.$id){
          console.log("disorder delete")
        }
      })
    },
    get : function(disorderId){
      return disorders.$getRecord(disorderId);
    },
    create : function(data){
      disorders.$add({name: data.name}).then(function(data){
        console.log("disorder Addes");
      })
    },
    createRelation : function(disorderId,criteriaId){
      var criterion = ref.child('disorders/'+disorderId+'/criterion');
      criterion.child(criteriaId).set(true);
      var disorders = ref.child('criterion/'+criteriaId+'/disorders');
      disorders.child(disorderId).set(true);
    }

  }
})

.factory('Criteria', function($firebaseArray){
  var loaded = false;
  var ref = new Firebase(firebaseUrl);
  var criterion = $firebaseArray(ref.child("criterion"));
  criterion.$loaded().then(function(x){
    loaded = true;
  }).catch(function(error){
    console.log("Error:",error);
  })
  return {
    all : function(){
      return criterion;
    },
    state : function(){
      return loaded;
    },
    delete : function(criteriaId){
      var criteriaToDelete = criterion.$getRecord(criteriaId);
      criterion.$remove(criteriaToDelete).then(function(ref){
        if(ref.key() === criteriaToDelete.$id){
          console.log("criteria delete");
        }
      })
    },
    get : function(criteriaId){
      return criterion.$getRecord(criteriaId);
    },
    create : function(data){
      criterion.$add({description: data.description}).then(function(data){
        console.log("criteria added");
      })
    }
  }

})

.factory('Message', function($firebaseArray){
  function Message(snap){
    this.message_id = snap.key();
    this.message = snap.val();
  }
  Message.prototype = {
    update : function(snap){
      // store a string into this.message (insted of the default $value)

      if(snap.val() !== this.message) {
        this.message = snap.val();
        return true;
      }
      return false;
    },
    toJSON : function(){
      return this.message;
    }
  };
  return Message;
})

.factory('MessageFactory', function($firebaseArray, Message){
  return $firebaseArray.$extend({
    // override the $createObject behavieor to return a Message object
    $$added : function(snap){
      return new Message(snap);
    },

    //override the $$update behavior to call a method on the Message
    $$update : function(snap){
      var msg = this.$getRecord(snap.key());
      return msg.update(snap);
    },

    $$getKey : function(rec){
      return rec.message_id;
    }
  });
})

.factory('MessageList',function(MessageFactory){
  return function(ref){
    return new MessageFactory(ref);
  }
})

// .factory('Criteria',function($firebaseArray){
//   var ref = new Firebase(firebaseUrl);
//   var criterion = $firebaseArray(ref.child('criteria'));
//
//   return {
//     all : function(){
//       return criterion;
//     },
//     get : function(criteriaId){
//       return criterion.$getRecord(criteriaId);
//     },
//     create : function(){
//
//     }
//   }
// })



.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
