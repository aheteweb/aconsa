//(function () {
	/* Initialize Firebase

		var config = {
	    apiKey: "AIzaSyAILGOk5VFbrJQ4bMSDKoVRVHZQ8i2QUlg",
	    authDomain: "test-fbe09.firebaseapp.com",
	    databaseURL: "https://test-fbe09.firebaseio.com",
	    storageBucket: "test-fbe09.appspot.com",
	    messagingSenderId: "260683882874"
	  };
	  firebase.initializeApp(config);

		You can initialize multiple firebase apps: https://firebase.google.com/docs/web/setup#initialize_multiple_apps

		Example call:
			initializefb({
				apiKey: "AIzaSyAILGOk5VFbrJQ4bMSDKoVRVHZQ8i2QUlg",
		    authDomain: "test-fbe09.firebaseapp.com",
		    databaseURL: "https://test-fbe09.firebaseio.com",
		    storageBucket: "test-fbe09.appspot.com",
		    messagingSenderId: "260683882874"
			})
	*/ 
		
		// Initialize Firebase
	  var config = {
	    apiKey: "AIzaSyAV7S95Fhqik3b6JZscnU3L-AS8l_2Avz8",
	    authDomain: "gh-authentication.firebaseapp.com",
	    databaseURL: "https://gh-authentication.firebaseio.com",
	    projectId: "gh-authentication",
	    storageBucket: "gh-authentication.appspot.com",
	    messagingSenderId: "247405669714"
	  };
	  firebase.initializeApp(config);

	////	AUTH
	  
		/* Create a password based account: https://firebase.google.com/docs/auth/web/password-auth#create_a_password-based_account
			
			Error Codes:
				auth/email-already-in-use  : Thrown if there already exists an account with the given email address.
				auth/operation-not-allowed : Thrown if email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab.
				auth/weak-password         : Thrown if the password is not strong enough.

			Parameters:
				email (string)    : The user's email address.
				password (string) : The user's chosen password.

			Example call:
				createPassUser({
					email    : 'arturojmontero@gmail.com',
					password : '123456',
					success : function(data){
						console.log('success');
						console.log(data);
						maindata = data;
					},
					error   : function(error){
						console.log(error.code);
						console.log(error.message);
					}
				})
		*/
			var createPassUser = function(par){
				firebase.auth().createUserWithEmailAndPassword(par.email, par.password).then(function(data){
					par.success(data);
				}, function(error){
					par.error(error);
				});
			}

		/* Sign in a user with an email address and password: https://firebase.google.com/docs/auth/web/password-auth#sign_in_a_user_with_an_email_address_and_password

			Error Codes:
				auth/invalid-email  : Thrown if the email address is not valid.
				auth/user-disabled  : Thrown if the user corresponding to the given email has been disabled.
				auth/user-not-found : Thrown if there is no user corresponding to the given email.
				auth/wrong-password : Thrown if the password is invalid for the given email, or the account corresponding to the email does not have a password set.

			Parameters:
				email (string)    : The user's email address.
				password (string) : The user's chosen password.

			Example call:
				mailSignin({
					email    : 'arturojmontero@gmail.com',
					password : '123456',
					success  : function(){
					console.log('success');
					},
					error    : function(error){
					console.log(error.code);
					console.log(error.message);
					}
				})
		*/
			var mailSignin = function(par){
				firebase.auth().signInWithEmailAndPassword(par.email, par.password).then(function(data){
					par.success(data)
				}, function(error){
					par.error(error);
				});
			}

		/* Checkout
				https://firebase.google.com/docs/auth/web/google-signin
				https://firebase.google.com/docs/auth/web/facebook-login
				https://firebase.google.com/docs/auth/web/twitter-login
				https://firebase.google.com/docs/auth/web/github-auth
				https://firebase.google.com/docs/auth/web/custom-auth
		*/

		/* Sign out
			Example call:
				signOut({
					success: function(){
						console.log('signed out');
					},
					error: function(error){
						console.log(error)
					}
				})
		*/
			var signOut = function(par){
				firebase.auth().signOut().then(function() {
				  par.success();
				}, function(error) {
				  par.error(error);
				});
			}

		/* Get User
			
			On auth state change:
				firebase.auth().onAuthStateChanged(function(user) {
				  if (user) {
				    // User is signed in.
				  } else {
				    // No user is signed in.
				  }
				});

			Programatically:
				var user = firebase.auth().currentUser;

			Example call: 
				watchAuthState({
					action: function(user){
						console.log('state changed')
						console.log(user);
					}
				})
		*/
			var watchAuthState = function(par){
				firebase.auth().onAuthStateChanged(function(user) {
				  par.action(user);
				});
			}

		/* Update user

			Example call:
				updateUser({
					displayName: "Jane Q. User",
					photoURL: "https://example.com/jane-q-user/profile.jpg",
				},
				{
					success: function(){
						console.log('user updated');
					},
					error: function(error){
						console.log(error)
					}
				})
		*/
			var updateUser = function(par, actions){
				firebase.auth().currentUser.updateProfile(par).then(function() {
				  actions.success();
				}, function(error) {
				  actions.error();
				});
			}

		/* Update email

			Example call:
				updateEmail({
					email: 'arturojmontero@hotmail.com',
					success: function(){
						console.log('email updated')
					},
					error: function(error){
						console.log(error);
						if(error.code === 'auth/requires-recent-login'){
							console.log('reauthenticate');
						}
					}
				})
		*/
			var updateEmail = function(par){
				firebase.auth().currentUser.updateEmail(par.email).then(function() {
				  par.success();
				}, function(error) {
				  par.error(error);
				});
			}

		/* Send user verification email

			You can customize the email template that is used in '/authentication/emails', on the Email Templates page. See (https://support.google.com/firebase/answer/7000714) in Firebase Help Center.

			Example call:
				verifyMail({
					success: function(){
						console.log('mail sent');
					},
					error: function(error){
						console.log(error);
						
					}
				})
		*/
			var verifyMail = function(par){
				firebase.auth().currentUser.sendEmailVerification().then(function() {
				  par.success();
				}, function(error) {
				  par.error(error);
				});
			}

		/* Update user password
		
			Example call:
				updatePass({
					pass: 'aeiou123456',
					success: function(){
						console.log('password updated')
					},
					error: function(error){
						console.log(error);
						if(error.code === 'auth/requires-recent-login'){
							console.log('reauthenticate');
						}
					}
				})
		*/
			var updatePass = function(par){
				firebase.auth().currentUser.updatePassword(par.pass).then(function() {
				  par.success();
				}, function(error) {
				  par.error(error);
				});
			}

		/* send a password reset email
			
			Example call:
				passResetMail({
					email: 'arturojmontero@gmail.com',
					success: function(){
						console.log('email sent');
					},
					error: function(error){
						console.log(error);
					}
				})
		*/
			var passResetMail = function(par){
				firebase.auth().sendPasswordResetEmail(par.email).then(function() {
				  par.success();
				}, function(error) {
				  par.error();
				});
			}

		/* Delete user

			Example call:
				deleteUser({
					success: function(){
						console.log('user deleted');
					},
					error: function(error){
						console.log(error);
					}
				})
		*/
			var deleteUser = function(par){
				firebase.auth().currentUser.delete().then(function() {
				  par.success();
				}, function(error) {
				  par.error(error);
				});
			}

		/* Re-authenticate
			Example call:
				reauthenticate({
					credential: firebase.auth.EmailAuthProvider.credential(
					  firebase.auth().currentUser.email, 
					  '123456'
					),
					success: function(){
						console.log('user re-authenticated');
					},
					error: function(error){
						console.log(error);
					}
				})
		*/
			var reauthenticate = function(par){
				firebase.auth().currentUser.reauthenticate(par.credential).then(function() {
				  par.success();
				}, function(error) {
				  par.error(error);
				});
			}

	/// DATABASE
		
		/* Write data
			For basic write operations, you can use set() to save data to a specified reference, replacing any existing data at that path

			Example call:
				dbWrite({
					path: 'users/' + firebase.auth().currentUser.uid,
					data: {
						username: firebase.auth().currentUser.displayName,
				    email: firebase.auth().currentUser.email,
				    profile_picture : firebase.auth().currentUser.photoURL
					},
					success: function(){
						console.log('success');
					},
					error: function(error){
						console.log(error)
					}
				})
		*/
			var dbWrite = function(par){
				firebase.database().ref(par.path).set(par.data).then(function(){
					par.success();
				}, function(error){
					par.error();
				});
			}

		/* Read data changes
			This method is triggered once when the listener is attached and again every time the data, including children, changes
			
			Example call:
				dbRead({
					path: 'users/' + firebase.auth().currentUser.uid,
					action: function(snapshot){
						console.log(snapshot.val());
					},
					error: function(error){
						console.log(error);
					}
				})
		*/
			var dbRead = function(par){
				firebase.database().ref(par.path).once('value').then(function(snapshot) {
				  par.action(snapshot);
				}, function(error){
					par.error(error)
				});
			}

		/* Read data once
			In some cases you may want a snapshot of your data without listening for changes, such as when initializing a UI element that you don't expect to change. You can use the once() method to simplify this scenario: it triggers once and then does not trigger again. This is useful for data that only needs to be loaded once and isn't expected to change frequently or require active listening.

			Example call:
				dbReadOnce({
					path: 'users/' + firebase.auth().currentUser.uid,
					action: function(snapshot){
						console.log(snapshot.val());
					}
				})
		*/
			var dbReadOnce = function(par){
				firebase.database().ref(par.path).once('value', function(snapshot) {
				  par.action(snapshot);
				});
			}

		/* Update data
			To simultaneously write to specific children of a node without overwriting other child nodes, use the update() method. When calling update(), you can update lower-level child values by specifying a path for the key. If data is stored in multiple locations to scale better, you can update all instances of that data using data fan-out (https://firebase.google.com/docs/database/web/structure-data#fanout).

			There is a good example of updating a value that is stored in multiple nodes at the same time: https://firebase.google.com/docs/database/web/read-and-write#updating_or_deleting_data
			
			Example call:
				var updates = {};
				updates['users/' + firebase.auth().currentUser.uid] = 'New value'
				dbUpdate({
					updates: updates,
					success: function(){
						console.log('updated');
					}
				})
		*/
			var dbUpdate = function(par){
				firebase.database().ref().update(par.updates).then(function(){
					par.success();
				});
			}

		/* Delete data
			The simplest way to delete data is to call remove() on a reference to the location of that data. You can also delete by specifying null as the value for another write operation such as set() or update(). You can use this technique with update() to delete multiple children in a single API call.

			dbDelete({
				path: 'users/' + firebase.auth().currentUser.uid] + '/email',
				success: function(){
					console.log('success');
				}
			})
		*/
			var dbDelete = function(par){
				firebase.database().ref(par.path).remove().then(function(){
					path.success();
				});
			}

		/* Detach listeners
			Callbacks are removed by calling the off() method on your Firebase database reference.
			You can remove a single listener by passing it as a parameter to off(). Calling off() on the location with no arguments removes all listeners at that location.
			Calling off() on a parent listener does not automatically remove listeners registered on its child nodes; off() must also be called on any child listeners to remove the callback.
		
			Example call:
				dbDetach({
					path: 'users/' + firebase.auth().currentUser.uid
				})
		*/
			var dbDetach = function(par){
				firebase.database().ref(par.path).off();
			}

		/* Transactions
			When working with data that could be corrupted by concurrent modifications, such as incremental counters, you can use a transaction operation. You can give this operation an update function and an optional completion callback. The update function takes the current state of the data as an argument and returns the new desired state you would like to write. If another client writes to the location before your new value is successfully written, your update function is called again with the new current value, and the write is retried.

			see: https://firebase.google.com/docs/reference/js/firebase.database.Reference#transaction
		*/
		
		/* Reading and writing lists
			Use the push() method to append data to a list in multiuser applications. The push() method generates a unique key every time a new child is added to the specified Firebase reference. By using these auto-generated keys for each new element in the list, several clients can add children to the same location at the same time without write conflicts. The unique key generated by push() is based on a timestamp, so list items are automatically ordered chronologically. 

			You can use the reference to the new data returned by the push() method to get the value of the child's auto-generated key or set data for the child. The .key property of a push() reference contains the auto-generated key.

			You can use these auto-generated keys to simplify flattening your data structure. For more information, see the data fan-out example.

			For example, push() could be used to add a new post to a list of posts in a social application:

			var newPostRef = postListRef.push();
			newPostRef.set({
			    // ...
			});

			Example call:
				writeList({
					path: 'users',
					data: {
						pushedValue: 'new pushed value'
					},
					success: function(){
						console.log('pushed');
					},
					error: function(error){
						console.log(error)
					}
				})
		*/
			var writeList = function(par){
				firebase.database().ref().child(par.path).push().set(par.data).then(function(){
					par.success();
				}, function(error){
					par.error();
				});
			}

		/* Listen for child events
			Child events are triggered in response to specific operations that happen to the children of a node from an operation such as a new child added through the push() method or a child being updated through the update() method.

			child_added, child_changed, child_removed, child_moved

			Example call:
				listenChildEvent({
					path: 'users',
					event: 'child_added',
					action: function(snapshot){
						console.log(snapshot.val());
					}
				})
		*/
			var listenChildEvent = function(par){
				firebase.database().ref(par.path).on(par.event, function(snapshot) {
				  par.action(snapshot)
				});
			}

		/* Sorting data
			You can use the Realtime Database Query class to retrieve data sorted by key, by value, or by value of a child. You can also filter the sorted result to a specific number of results or a range of keys or values.

			Note: Filtering and sorting can be expensive, especially when done on the client. If your app uses queries, define the .indexOn rule to index those keys on the server and improve query performance. Example:
				{
				  "rules": {
				    "dinosaurs": {
				      ".indexOn": ["height", "length"]
				    }
				  }
				}
			----------------------------------------------------------
				{
				  "rules": {
				    "scores": {
				      ".indexOn": ".value"
				    }
				  }
				}

			Example call:
				orderByKey({
					path: 'dinosaurs',
					event: 'child_added',
					action: function(snapshot){
						console.log(snapshot.val());
					}
				})

				orderByChild({
					path: 'dinosaurs',
					attribute: 'height',
					event: 'child_added',
					action: function(snapshot){
						console.log(snapshot.val());
					}
				})

				orderByValue({
					path: 'dinosaurs/lambeosaurus',
					event: 'child_added',
					action: function(snapshot){
						console.log(snapshot.val());
					}
				})
		*/
			var orderByKey = function(par){
				firebase.database().ref(par.path).orderByKey().on(par.event, function(snapshot) {
				  par.action(snapshot)
				});
			}
			var orderByChild = function(par){
				firebase.database().ref(par.path).orderByChild(par.attribute).on(par.event, function(snapshot) {
				  par.action(snapshot)
				});
			}
			var orderByValue = function(par){
				firebase.database().ref(par.path).orderByValue().on(par.event, function(snapshot) {
				  par.action(snapshot)
				});
			}

		/* Filtering data
			To filter data, you can combine any of the limit or range methods with an order-by method when constructing a query.

			limitToFirst(), limitToLast(), startAt(), endAt(), equalTo()

			example: 
			var ref = firebase.database().ref("dinosaurs");
			ref.orderByKey().endAt("pterodactyl").on("child_added", function(snapshot) {
			  console.log(snapshot.key);
			});

			see: 
				https://firebase.google.com/docs/reference/js/firebase.database.Query#methods
		*/
	
	//return {
	//	init: init
	//}

//})();