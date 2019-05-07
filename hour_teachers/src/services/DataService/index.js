import * as firebase from 'firebase';

export default class DataService{

    static async getObject(collection, objId) {
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

}