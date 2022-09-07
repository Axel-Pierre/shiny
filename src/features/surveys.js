import produce from 'immer';
import {selectSurveys} from '../utils/selectors';

const initialState = {
// le statut permet de suivre l'état de la requête
status: 'void',
// les données lorsque la requête a fonctionné
data: null,
// l'erreur lorsque la requête échoue
error: null,
}
// Les noms des actions
const FETCHING = 'surveys/fetching'
const RESOLVED = 'surveys/resolved'
const REJECTED = 'surveys/rejected'

// la requête est en cours
const surveysFetching = () => ({ type: FETCHING })
// la requête a fonctionné
const surveysResolved = (data) => ({ type: RESOLVED, payload: data })
// la requête a échoué
const surveysRejected = (error) => ({ type: REJECTED, payload: error })
 // on enregistre l'id 
export async function fetchOrUpdateSurveys(store){
    console.log(store.getState());
    const status = selectSurveys(store.getState()).status

    if(status ==='pending' || status ==="updating"){
        return
    }
    store.dispatch(surveysFetching())
    try{
        const response = await fetch('http://localhost:8000/survey');
       
        const data = await response.json();
       
        store.dispatch(surveysResolved(data))
    }catch(error){
        store.dispatch(surveysRejected(error))
    }
}

export default  function surveysReducer(state = initialState, action){
    return produce(state, (draft) =>{
        switch(action.type){
            case FETCHING: {
                // si le statut est void
                if (draft.status === 'void') {
                  // on passe en pending
                  draft.status = 'pending'
                  return
                }
                // si le statut est rejected
                if (draft.status === 'rejected') {
                  // on supprime l'erreur et on passe en pending
                  draft.error = null
                  draft.status = 'pending'
                  return
                }
                // si le statut est resolved
                if (draft.status === 'resolved') {
                  // on passe en updating (requête en cours mais des données sont déjà présentent)
                  draft.status = 'updating'
                  return
                }
                // sinon l'action est ignorée
                return
              }
              // si l'action est de type RESOLVED
              case RESOLVED: {
                // si la requête est en cours
                if (draft.status === 'pending' || draft.status === 'updating') {
                  // on passe en resolved et on sauvegarde les données
                  draft.data = action.payload
                  draft.status = 'resolved'
                  return
                }
                // sinon l'action est ignorée
                return
              }
              // si l'action est de type REJECTED
              case REJECTED: {
                // si la requête est en cours
                if (draft.status === 'pending' || draft.status === 'updating') {
                  // on passe en rejected, on sauvegarde l'erreur et on supprime les données
                  draft.status = 'rejected'
                  draft.error = action.payload
                  draft.data = null
                  return
                }
                // sinon l'action est ignorée
                return
              }
              default: 
              return

        };


    })
   
};