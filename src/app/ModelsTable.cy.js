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
    // TODO - first run doesn't work because of API loading
    // The data is from google spreadsheet
    const totalRows = 28;
    const testOrgan = 'Bladder';
    const testOrganTotalRows = 4;
    const testSpecies = 'Rat';
    const testSpeciesTotalRows = 8;
    const testNote = 'Generic';
    const testNoteTotalRows = 10;

    // Alias
    cy.get('input[placeholder="Type to search"]')
      .as('searchInput');
    cy.get('.el-table__body-wrapper tr.el-table__row')
      .as('row');
    cy.get('.el-table__body-wrapper tr.el-table__row td')
      .first()
      .as('firstCol');
    cy.get('.el-table__body-wrapper tr.el-table__row td')
      .eq(1)
      .as('secondCol');
    cy.get('.el-table__body-wrapper tr.el-table__row td')
      .eq(2)
      .as('thirdCol');

    // All rows
    cy.get('.el-table__body-wrapper')
      .find('tr.el-table__row')
      .should('have.length', totalRows);

    // Test Organ
    cy.get('@searchInput')
      .type(testOrgan);
    cy.get('@firstCol')
      .contains('Liver')
      .should('not.exist');
    cy.get('@firstCol')
      .contains(testOrgan)
      .should('exist');
    cy.get('@firstCol')
      .contains('Brain')
      .should('not.exist');
    cy.get('@row')
      .filter(`:contains(${testOrgan})`)
      .should('have.length', testOrganTotalRows);

    // Clear search
    cy.get('@searchInput')
      .clear();
    cy.get('.el-table__body-wrapper')
      .find('tr.el-table__row')
      .should('have.length', totalRows);

    // Test Species
    cy.get('@searchInput')
      .type(testSpecies);
    cy.get('@secondCol')
      .contains('Liver')
      .should('not.exist');
    cy.get('@secondCol')
      .contains(testSpecies)
      .should('exist');
    cy.get('@secondCol')
      .contains('Brain')
      .should('not.exist');
    cy.get('@row')
      .filter(`:contains(${testSpecies})`)
      .should('have.length', testSpeciesTotalRows);

    // Clear search
    cy.get('@searchInput')
      .clear();
    cy.get('.el-table__body-wrapper')
      .find('tr.el-table__row')
      .should('have.length', totalRows);

    // Test Note
    cy.get('@searchInput')
      .type(testNote);
    cy.get('@thirdCol')
      .contains('Liver')
      .should('not.exist');
    cy.get('@thirdCol')
      .contains(testNote)
      .should('exist');
    cy.get('@thirdCol')
      .contains('Brain')
      .should('not.exist');
    cy.get('@row')
      .filter(`:contains(${testNote})`)
      .should('have.length', testNoteTotalRows);
  });

  // Sort
  it('should sort table columns', () => {
    // Trigger sort by key

    // Verify that the table is sorted as expected

    // Test for each key: Organs, Species, and Last modified
  });
});
