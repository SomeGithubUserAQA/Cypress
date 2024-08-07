export function extractOutputData() {
    return cy.get('#output').then(($output) => {
      const OutputFullName = $output.find('#name').text().replace(/^[^:]*:\s*/, '').trim();
      const OutputEmail = $output.find('#email').text().replace(/^[^:]*:\s*/, '').trim();
      const OutputCurrentAddress = $output.find('#currentAddress').text().replace(/^[^:]*:\s*/, '').trim();
      const OutputPermanentAddress = $output.find('#permanentAddress').text().replace(/^[^:]*:\s*/, '').trim();
  
      return { OutputFullName, OutputEmail, OutputCurrentAddress, OutputPermanentAddress };
    });
  }