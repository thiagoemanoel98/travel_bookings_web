import produce from "immer";

// State reserve
// Inicia com um estado vazio
// Imutavel: Nao pode mudar diretamente o valor
export default function reserve(state = [], action) {
  switch (action.type) {
    case "ADD_RESERVE_SUCCESS":
      // draft: Copia uma referencia, nao altera ooriginal
      return produce(state, (draft) => {
        draft.push(action.trip);        
      });
    case "REMOVE_RESERVE":
      return produce(state, (draft) => {
        const tripIndex = draft.findIndex((trip) => trip.id === action.id);

        if (tripIndex >= 0) {
          // Exclui
          draft.splice(tripIndex, 1);
        }
      });
    case "UPDATE_RESERVE":
      if (action.amount <= 0) {
        return state;
      }

      return produce(state, (draft) => {
        const tripIndex = draft.findIndex((trip) => trip.id === action.id);

        if (tripIndex >= 0) {
          draft[tripIndex].amount = Number(action.amount);
        }
      });
    default:
      return state;
  }
}
