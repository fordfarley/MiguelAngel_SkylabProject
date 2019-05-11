import * as firebase from 'firebase';

export default class DataService{

  static async getTalents() {
    const db = firebase.firestore();
    let results = [];

    try {
      const querySnapshot = await db.collection("talents").get();

      querySnapshot.forEach(doc => {
        const objectResult = doc.data();
        objectResult.id = doc.id;
        results.push(objectResult);
      }) 
    } catch (err) {
			console.log("TCL: DataService -> getContacts -> err", err)
    }
    return results;
  }

    static getObject= async(collection, objId)=> {
        const db = firebase.firestore();
        let resultObject = null;
    
        try{ 
          const objectRef = await db.collection(collection).doc(objId).get();
          if(objectRef.exists) {
            resultObject = objectRef.data();
          }
        } catch (err){
                console.log("TCL: DataService -> getObject -> err", err)
        } 
    
        return resultObject;
    }



    static addObjectWithId= async(collection, objId, data)=> {
        return await DataService.updateDetail(collection, objId, data)
    }

    static addObjectWithoutId= async(collection, data)=> {
      const db = firebase.firestore();
        let success = true;
    
        try {
          await db.collection(collection).add(data);
        } catch (err) {
          success = false;
          console.log("TCL: DataService -> updateDetail -> err", err)
        }
    
        return success;
  }
    
    static updateDetail= async(collection, id, data)=> {
        const db = firebase.firestore();
        let success = true;
    
        try {
          await db.collection(collection).doc(id).set(data, {merge: true});
        } catch (err) {
          success = false;
          console.log("TCL: DataService -> updateDetail -> err", err)
        }
    
        return success;
    }
    

}