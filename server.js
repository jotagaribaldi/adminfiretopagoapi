const express = require("express");
const app = express();

const admin = require("firebase-admin");
const credentials = require("./key.json");

admin.initializeApp({
	credential:admin.credential.cert(credentials)
})

const db = admin.firestore();

app.use(express.json());

app.post('/create', async (req, res) => {
	try{
		console.log(req.body);
		const id = req.body.email;
		const userJson = {
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName
		};
		const response = await db.collection("users").add(userJson);
		res.send(response);
	} catch(error) {
		res.send(error);
	}
})


app.get('/read/all', async (req, res) => {
	try{
		const usersRef = db.collection("leituras");
		const response = await usersRef.get();
		let responseArr = [];
		response.forEach(doc => {
			responseArr.push(doc.data());
			console.log(doc);
		})
		
		res.send(responseArr);
	} catch(error) {
		res.send(error);
	}
})

app.get('/read/userall', async (req, res) => {
	try{
		const usersRef = db.collection("usuarios");
		const response = await usersRef.get();
		let responseArr = [];
		response.forEach(doc => {
			responseArr.push(doc.data());
			console.log(doc);
		})
		
		res.send(responseArr);
	} catch(error) {
		res.send(error);
	}
})





app.get('/read/notlan', async (req, res) => {
	try{
		const usersRef = db.collection("leituras").where("status", "==", null);
		const response = await usersRef.get();
		let responseArr = [];
		response.forEach(doc => {
			responseArr.push(doc.data());
		})
		
		res.send(responseArr);
	} catch(error) {
		res.send(error);
	}
})

app.get('/read/:id', async (req, res) => {
	try{
		 
		const userRef = db.collection("users").doc(req.params.id);
		const response = await userRef.get();		
		res.send(response.data());
	} catch(error) {
		res.send(error);
	}
})



app.get('/read/users/all', async (req, res) => {
	try{
		const userssRef = db.collection("usuarios");
		const response = await userssRef.get();
		let responseArr = [];
		response.forEach(doc => {
			responseArr.push(doc.data());
		})
		
		res.send(responseArr);
	} catch(error) {
		res.send(error);
	}
})


app.get('/read/user/:id', async (req, res) => {
	try{
		 
		const userSRef = db.collection("usuarios").doc(req.params.id);
		const response = await userSRef.get();		
		res.send(response.data());
	} catch(error) {
		res.send(error);
	}
})



app.post('/update', async(req,res) => {
	try{
		const id=req.body.id;
		const newFirstName="Edmilson parente";
		const userRef = await db.collection("users").doc(id).update(
			{firstName: newFirstName});
		//const response = await userRef.get();		
		res.send(useerRefs);
	} catch(error){
		res.send();
	}
})


app.delete('/delete/:id', async (req, res) => {
	try{
		const response = await db.collection("users").doc(req.params.id).delete();			
		res.send(response.data());
	} catch(error) {
		res.send(error);
	}
})

app.use(express.urlencoded({extended: true}));


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Server Running on PORT ${PORT}.`);
})
