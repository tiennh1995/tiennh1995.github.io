window.onload = function(e){ 
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
			console.log('Registration successful, scope is:', registration.scope);
		}).catch(function(error) {
			console.log('Service worker registration failed, error:', error);
		});
	} 

	var schema = {
	  fullTextCatalogs: [{
	    name: 'dictionary',
	    lang: 'en',
	    sources: [
	      {
	        storeName: 'word',
	        keyPath: 'first'
	      },
	      {
	        storeName: 'word',
	        keyPath: 'meaning'
	      },
	      {
	        storeName: 'word',
	        keyPath: 'example'
	      }	        	        
	    ],
	  }],
	  stores: [
	    {
	      name: 'word',
	      autoIncrement: true
	    }
		]
	};

	var db = new ydn.db.Storage('db dictionary', schema);
	db.clear();
	db.put('word', [{first: 'Jhon', meaning: 'meaning', example: 'example'}, 
		{first: 'Jhon', meaning: 'meaning2', example: 'example2'}]);

	document.querySelector('.button').addEventListener('click', function(event) {
		event.preventDefault();
		debugger;
		db.search('dictionary', 'Jhon').done(function(words) {
			debugger;
			words.forEach(function(word) {
			  db.get(word.storeName, word.primaryKey).done(function(top) {
			  	debugger;
			    document.getElementById('content').append(top.first + ' ' + top.meaning + ' ' + top.example);
			  })
			})			
		});
	});	
}
