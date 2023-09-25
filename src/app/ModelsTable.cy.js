import ModelsTable from './ModelsTable.vue';

describe('<ModelsTable />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ModelsTable)
  });
});
