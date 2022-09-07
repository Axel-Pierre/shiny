

export const selectTheme = (state) => state.theme
export const selectSurveys = (state) => state.surveys

export const selectFreelances = (state) => state.freelances

const voidFreelance = { status: 'void' }
export const selectFreelance = (freelanceId) => (state) => { return state.freelance[freelanceId] ?? voidFreelance}