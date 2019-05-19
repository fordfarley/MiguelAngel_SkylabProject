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

    static addTalentToUser(user,talents,idTalent){
        talents.push(idTalent);
        this.updateDetail("users",user,{talents:talents});
    }


    static addTalent= async(data, user, talents)=> {
      const db = firebase.firestore();
        let success = true;
    
        try {
          const docRef = await db.collection("talents").add(data);
          if(docRef && docRef.id) {
            success = true;
            this.addTalentToUser(user,talents,docRef.id);
            return docRef.id;
          }
        } catch (err) {
          success = false;
          console.log("TCL: DataService -> updateDetail -> err", err)
        }
    
        return success;
  }

    static addObjectWithoutId= async(collection, data)=> {
      const db = firebase.firestore();
        let success = true;
    
        try {
          const docRef = await db.collection(collection).add(data);
          if(docRef && docRef.id) {
            success = true;
          }
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

    static async deleteObject(collection,objectId) {
      const db = firebase.firestore();
      let success = true;
  
      try {
        await db.collection(collection).doc(objectId).delete();
  
      } catch (err) {
        success = false;
        console.log("TCL: DataService -> deleteContact -> err", err)
      }
  
      return success;
    }
    

}