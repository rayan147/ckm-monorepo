// src/lib/services/printLabelService.js

/**
 * Creates a printable label version of a recipe in a new window
 * 
 * @param {Object} recipe - The recipe object to print as a label
 */
import type { RecipeIncludes } from "$lib/contexts/recipe-context.svelte";

export function printRecipeLabel(recipe: RecipeIncludes) {
  console.log(`Print recipe label ${JSON.stringify(recipe, null, 2)}`);
  // Create a new window
  const printWindow = window.open('', '_blank', 'width=400,height=500');

  if (!printWindow) {
    alert('Please allow pop-ups to print this recipe label');
    return;
  }

  // Generate date and expiration date if storage info exists
  const preparationDate = new Date();
  let expirationDate = null;
  if (recipe.storage && recipe.storage.shelfLife) {
    expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + recipe.storage.shelfLife);
  }

  // Format ingredients nicely
  const mainIngredients = recipe.ingredients && recipe.ingredients.length > 0
    ? recipe.ingredients
      .slice(0, 4) // Reduced from 5 to 4 for better spacing
      .map(ing => ing.ingredient?.name || '')
      .filter(name => name.trim() !== '')
      .join(', ') + (recipe.ingredients.length > 4 ? '...' : '')
    : 'No ingredients listed';

  // Generate the HTML content for the printable label
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Label: ${recipe.name}</title>
      <style>
        @media print {
          @page {
            margin: 0.2in;
            size: 4in 6in;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          line-height: 1.3;
          color: #333;
          max-width: 4in;
          margin: 0 auto;
          padding: 0.2in;
          background-color: #f8f9fa;
        }
        
        h1 {
          font-size: 18pt;
          margin-top: 0;
          margin-bottom: 0.15in;
          text-align: center;
          color: #1a202c;
          padding-bottom: 0.1in;
          border-bottom: 2px solid #e2e8f0;
        }
        
        .label-container {
          background-color: white;
          border-radius: 8px;
          padding: 0.25in;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        }
        
        .recipe-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.15in;
          margin-bottom: 0.2in;
          background-color: #f7fafc;
          padding: 0.15in;
          border-radius: 6px;
        }
        
        .meta-item {
          display: flex;
          flex-direction: column;
        }
        
        .meta-label {
          font-weight: 600;
          font-size: 8pt;
          text-transform: uppercase;
          color: #4a5568;
          letter-spacing: 0.5px;
        }
        
        .meta-value {
          font-size: 11pt;
          font-weight: 500;
          color: #2d3748;
        }
        
        .section {
          margin-bottom: 0.2in;
          padding-bottom: 0.1in;
          border-bottom: 1px dotted #e2e8f0;
        }
        
        .section-label {
          font-weight: 600;
          font-size: 9pt;
          color: #4a5568;
          margin-bottom: 0.05in;
        }
        
        .section-content {
          font-size: 10pt;
          color: #2d3748;
        }
        
        .allergens {
          margin-top: 0.15in;
          font-size: 8pt;
          color: #c53030;
          background-color: #fff5f5;
          padding: 0.1in;
          border-radius: 4px;
          border-left: 3px solid #fc8181;
        }
        
        .dates {
          display: flex;
          justify-content: space-between;
          margin-top: 0.15in;
          font-size: 9pt;
        }
        
        .date-item {
          display: flex;
          flex-direction: column;
        }
        
        .date-label {
          font-weight: 600;
          font-size: 7pt;
          text-transform: uppercase;
          color: #4a5568;
        }
        
        .date-value {
          font-size: 9pt;
          color: #2d3748;
        }
        
        .label-footer {
          margin-top: 0.2in;
          font-size: 7pt;
          color: #718096;
          text-align: center;
        }
        
        .qr-placeholder {
          margin: 0.1in auto;
          width: 0.7in;
          height: 0.7in;
          background-color: #f7fafc;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 6pt;
          color: #718096;
          text-align: center;
        }
        
        .print-button {
          background-color: #4299e1;
          color: white;
          border: none;
          padding: 0.1in 0.2in;
          font-size: 11pt;
          cursor: pointer;
          border-radius: 4px;
          margin-bottom: 0.2in;
          display: block;
          width: 100%;
          font-weight: 600;
          transition: background-color 0.2s ease;
        }
        
        .print-button:hover {
          background-color: #3182ce;
        }
        
        @media print {
          .no-print {
            display: none;
          }
          
          body {
            background-color: white;
            padding: 0;
          }
          
          .label-container {
            box-shadow: none;
            padding: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="no-print">
        <button class="print-button" onclick="window.print(); return false;">Print Label</button>
      </div>
      
      <div class="label-container">
        <h1>${recipe.name}</h1>
        
        <div class="recipe-meta">
          <div class="meta-item">
            <span class="meta-label">Servings</span>
            <span class="meta-value">${recipe.servings}</span>
          </div>
          
          <div class="meta-item">
            <span class="meta-label">Total Time</span>
            <span class="meta-value">${recipe.prepTime + recipe.cookTime} min</span>
          </div>
          
          ${recipe.nutritionalInfo ? `
          <div class="meta-item">
            <span class="meta-label">Calories</span>
            <span class="meta-value">${new Intl.NumberFormat('en').format(recipe.nutritionalInfo.calories.toFixed(0))}</span>
          </div>
          ` : ''}
        </div>
        
        <div class="section">
          <div class="section-label">Main Ingredients</div>
          <div class="section-content">${mainIngredients}</div>
        </div>
        
        ${recipe.storage ? `
        <div class="section">
          <div class="section-label">Storage Instructions</div>
          <div class="section-content">
            ${recipe.storage.method || 'Store'} 
            ${recipe.storage.containerType ? `in ${recipe.storage.containerType}` : ''} 
            ${recipe.storage.temperature ? `at ${recipe.storage.temperature.toFixed(1)}°` : ''}
            ${recipe.storage.shelfLife ? `for up to ${recipe.storage.shelfLife} days` : ''}
          </div>
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
        <div class="allergens">
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
        
        <div class="dates">
          <div class="date-item">
            <span class="date-label">Prepared</span>
            <span class="date-value">${preparationDate.toLocaleDateString()}</span>
          </div>
          
          ${expirationDate ? `
          <div class="date-item">
            <span class="date-label">Best Before</span>
            <span class="date-value">${expirationDate.toLocaleDateString()}</span>
          </div>
          ` : ''}
        </div>
        
        <div class="qr-placeholder">
          Recipe ID: ${recipe.id}
        </div>
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
