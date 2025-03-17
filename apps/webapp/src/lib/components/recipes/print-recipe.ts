// src/lib/services/printRecipeService.js

/**
 * Creates a printable version of a recipe in a new window
 * 
 * @param {Object} recipe - The recipe object to print
 */
export function printRecipe(recipe) {
  // Create a new window
  const printWindow = window.open('', '_blank', 'width=800,height=600');

  if (!printWindow) {
    alert('Please allow pop-ups to print this recipe');
    return;
  }

  // Generate the HTML content for the printable page
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Print: ${recipe.name}</title>
      <style>
        @media print {
          @page {
            margin: 0.5in;
          }
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          line-height: 1.5;
          color: #111;
          max-width: 8.5in;
          margin: 0 auto;
          padding: 0.5in;
        }
        
        h1, h2, h3 {
          margin-top: 0;
          color: #333;
        }
        
        h1 {
          font-size: 24pt;
          margin-bottom: 0.3in;
        }
        
        h2 {
          font-size: 16pt;
          margin-top: 0.4in;
          margin-bottom: 0.2in;
          border-bottom: 1px solid #ddd;
          padding-bottom: 0.1in;
        }
        
        .description {
          font-style: italic;
          margin-bottom: 0.3in;
        }
        
        .recipe-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.2in;
          margin-bottom: 0.4in;
          padding: 0.2in;
          background-color: #f9f9f9;
          border-radius: 4px;
        }
        
        .meta-item {
          flex: 1;
          min-width: 1.5in;
        }
        
        .meta-label {
          font-weight: bold;
          display: block;
          font-size: 9pt;
          text-transform: uppercase;
          color: #666;
        }
        
        .meta-value {
          font-size: 12pt;
        }
        
        .ingredients-list {
          margin: 0;
          padding: 0;
          list-style-type: none;
        }
        
        .ingredients-list li {
          padding: 0.1in 0;
          border-bottom: 1px dotted #eee;
        }
        
        .instruction-step {
          margin-bottom: 0.3in;
        }
        
        .step-number {
          display: inline-block;
          width: 25px;
          height: 25px;
          background-color: #333;
          color: white;
          text-align: center;
          border-radius: 50%;
          margin-right: 0.1in;
          font-weight: bold;
        }
        
        .step-text {
          font-size: 11pt;
        }
        
        .step-details {
          margin-top: 0.1in;
          margin-left: 0.4in;
          font-size: 10pt;
          color: #555;
        }
        
        .tips {
          margin-top: 0.1in;
          margin-left: 0.4in;
          font-style: italic;
          font-size: 10pt;
        }
        
        .tips li {
          margin-bottom: 0.05in;
        }
        
        .recipe-footer {
          margin-top: 0.5in;
          padding-top: 0.2in;
          border-top: 1px solid #ddd;
          font-size: 9pt;
          color: #666;
          text-align: center;
        }
        
        .column-layout {
          display: flex;
          gap: 0.3in;
        }
        
        .column {
          flex: 1;
        }
        
        @media print {
          .no-print {
            display: none;
          }
        }
        
        .print-button {
          background-color: #4a5568;
          color: white;
          border: none;
          padding: 0.1in 0.3in;
          font-size: 12pt;
          cursor: pointer;
          border-radius: 4px;
          margin-bottom: 0.3in;
          display: block;
        }
        
        .print-button:hover {
          background-color: #2d3748;
        }
        
        .allergies {
          margin-top: 0.2in;
          font-size: 10pt;
          color: #c53030;
        }
        
        .equipment-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        
        .equipment-list li {
          padding: 0.05in 0;
        }
      </style>
    </head>
    <body>
      <div class="no-print" style="text-align: right;">
        <button class="print-button" onclick="window.print(); return false;">Print Recipe</button>
      </div>
      
      <h1>${recipe.name}</h1>
      
      ${recipe.description ? `<p class="description">${recipe.description}</p>` : ''}
      
      <div class="recipe-meta">
        <div class="meta-item">
          <span class="meta-label">Prep Time</span>
          <span class="meta-value">${recipe.prepTime} minutes</span>
        </div>
        
        <div class="meta-item">
          <span class="meta-label">Cook Time</span>
          <span class="meta-value">${recipe.cookTime} minutes</span>
        </div>
        
        <div class="meta-item">
          <span class="meta-label">Total Time</span>
          <span class="meta-value">${recipe.prepTime + recipe.cookTime} minutes</span>
        </div>
        
        <div class="meta-item">
          <span class="meta-label">Servings</span>
          <span class="meta-value">${recipe.servings}</span>
        </div>
        
        ${recipe.skillLevel ? `
        <div class="meta-item">
          <span class="meta-label">Skill Level</span>
          <span class="meta-value">${recipe.skillLevel}</span>
        </div>
        ` : ''}
      </div>
      
      <div class="column-layout">
        <div class="column">
          <h2>Ingredients</h2>
          ${recipe.ingredients && recipe.ingredients.length > 0 ? `
          <ul class="ingredients-list">
            ${recipe.ingredients.map(ing => `
              <li>
                ${ing.quantity ? ing.quantity.toFixed(2) : ''} 
                ${ing.unit || ''} 
                ${ing.ingredient?.name || ''}
                ${ing.notes ? ` (${ing.notes})` : ''}
              </li>
            `).join('')}
          </ul>
          ` : '<p>No ingredients listed</p>'}
          
          ${recipe.equipment && recipe.equipment.length > 0 ? `
          <h2>Equipment</h2>
          <ul class="equipment-list">
            ${recipe.equipment.map(eq => `
              <li>
                ${eq.equipmentId ? `Equipment #${eq.equipmentId}` : ''}
                ${eq.notes ? ` - ${eq.notes}` : ''}
              </li>
            `).join('')}
          </ul>
          ` : ''}
          
          ${recipe.nutritionalInfo ? `
          <h2>Nutritional Information</h2>
          <div class="meta-item">
            <span class="meta-label">Calories</span>
            <span class="meta-value">${recipe.nutritionalInfo.calories.toFixed(1)}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Protein</span>
            <span class="meta-value">${recipe.nutritionalInfo.protein.toFixed(1)}g</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Carbohydrates</span>
            <span class="meta-value">${recipe.nutritionalInfo.carbohydrates.toFixed(1)}g</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Fat</span>
            <span class="meta-value">${recipe.nutritionalInfo.fat.toFixed(1)}g</span>
          </div>
          ` : ''}
          
          ${recipe.nutritionalInfo && (
      recipe.nutritionalInfo.containsDairy ||
      recipe.nutritionalInfo.containsEggs ||
      recipe.nutritionalInfo.containsFish ||
      recipe.nutritionalInfo.containsGluten ||
      recipe.nutritionalInfo.containsNuts ||
      recipe.nutritionalInfo.containsShellfish ||
      recipe.nutritionalInfo.containsSoy
    ) ? `
          <div class="allergies">
            <strong>Allergens:</strong> 
            ${recipe.nutritionalInfo.containsDairy ? 'Dairy, ' : ''}
            ${recipe.nutritionalInfo.containsEggs ? 'Eggs, ' : ''}
            ${recipe.nutritionalInfo.containsFish ? 'Fish, ' : ''}
            ${recipe.nutritionalInfo.containsGluten ? 'Gluten, ' : ''}
            ${recipe.nutritionalInfo.containsNuts ? 'Nuts, ' : ''}
            ${recipe.nutritionalInfo.containsShellfish ? 'Shellfish, ' : ''}
            ${recipe.nutritionalInfo.containsSoy ? 'Soy' : ''}
          </div>
          ` : ''}
        </div>
        
        <div class="column">
          <h2>Instructions</h2>
          ${recipe.instructions && recipe.instructions.length > 0 ? `
          <div class="instructions-list">
            ${recipe.instructions.map(step => `
              <div class="instruction-step">
                <div>
                  <span class="step-number">${step.stepNumber}</span>
                  <span class="step-text">${step.instruction}</span>
                </div>
                
                ${(step.timeInMinutes || step.temperature) ? `
                <div class="step-details">
                  ${step.timeInMinutes ? `Time: ${step.timeInMinutes} minutes` : ''}
                  ${step.timeInMinutes && step.temperature ? ' | ' : ''}
                  ${step.temperature ? `Temperature: ${step.temperature}° ${step.temperatureUnit || ''}` : ''}
                </div>
                ` : ''}
                
                ${step.techniqueTips ? `
                <div class="tips">
                  <strong>Technique tips:</strong> ${step.techniqueTips}
                </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
          ` : '<p>No instructions listed</p>'}
        </div>
      </div>
      
      ${recipe.storage ? `
      <h2>Storage Instructions</h2>
      <div class="storage-info">
        <p>
          ${recipe.storage.method ? `Method: ${recipe.storage.method}` : ''}
          ${recipe.storage.containerType ? ` in ${recipe.storage.containerType}` : ''}
          ${recipe.storage.temperature ? ` at ${recipe.storage.temperature.toFixed(1)}°` : ''}
        </p>
        ${recipe.storage.shelfLife ? `<p>Shelf life: ${recipe.storage.shelfLife} days</p>` : ''}
        ${recipe.storage.specialNotes ? `<p>Special notes: ${recipe.storage.specialNotes}</p>` : ''}
      </div>
      ` : ''}
      
      <div class="recipe-footer">
        <p>Recipe ID: ${recipe.id} | Printed on ${new Date().toLocaleDateString()}</p>
      </div>
    </body>
    </html>
  `;

  // Write to the new window document
  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();

  // Focus on the new window
  printWindow.focus();
}
