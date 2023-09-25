import ModelsTable from './ModelsTable.vue';

describe('<ModelsTable />', () => {
  it('renders', () => {
    cy.mount(ModelsTable);
  });
});

describe('Table Search and Sorting Test', () => {
  beforeEach(() => {
    cy.mount(ModelsTable);
  });

  // Search
  it('should filter table rows when searching', () => {
    // Wait for API data load

    // Type a search query into the input field

    // Verify that the table rows match the search query
  });

  // Sort
  it('should sort table columns', () => {
    // Trigger sort by key

    // Verify that the table is sorted as expected

    // Test for each key: Organs, Species, and Last modified
  });
});
