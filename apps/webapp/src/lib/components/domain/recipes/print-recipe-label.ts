// src/lib/services/printLabelService.js

/**
 * Creates a printable label version of a recipe in a new window
 * Enhanced with modern UI/UX best practices
 *
 * @param {Object} recipe - The recipe object to print as a label
 */
import type { RecipeIncludes } from '$lib/contexts/recipe-context.svelte';

export function printRecipeLabel(recipe: RecipeIncludes) {
  console.log(`Print recipe label ${JSON.stringify(recipe, null, 2)}`);
  // Create a new window
  const printWindow = window.open('', '_blank', 'width=400,height=600');

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
  const mainIngredients =
    recipe.ingredients && recipe.ingredients.length > 0
      ? recipe.ingredients
        .slice(0, 4)
        .map((ing) => ing.ingredient?.name || '')
        .filter((name) => name.trim() !== '')
        .join(', ') + (recipe.ingredients.length > 4 ? '...' : '')
      : 'No ingredients listed';

  // Format nutrition info
  const hasNutrition = recipe.nutritionalInfo && recipe.nutritionalInfo.calories;

  // Format allergens
  const allergens = [];
  if (recipe.nutritionalInfo) {
    if (recipe.nutritionalInfo.containsDairy) allergens.push('Dairy');
    if (recipe.nutritionalInfo.containsEggs) allergens.push('Eggs');
    if (recipe.nutritionalInfo.containsFish) allergens.push('Fish');
    if (recipe.nutritionalInfo.containsGluten) allergens.push('Gluten');
    if (recipe.nutritionalInfo.containsNuts) allergens.push('Nuts');
    if (recipe.nutritionalInfo.containsShellfish) allergens.push('Shellfish');
    if (recipe.nutritionalInfo.containsSoy) allergens.push('Soy');
  }

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
            margin: 0;
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
          line-height: 1.4;
          color: #333;
          max-width: 4in;
          margin: 0 auto;
          padding: 0.2in;
          background-color: #f8f9fa;
        }
        
        .print-button {
          background-color: #3b82f6;
          color: white;
          border: none;
          padding: 0.15in 0.2in;
          font-size: 12pt;
          cursor: pointer;
          border-radius: 6px;
          margin-bottom: 0.25in;
          display: block;
          width: 100%;
          font-weight: 600;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .print-button:hover {
          background-color: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .label-container {
          background-color: white;
          border-radius: 12px;
          padding: 0.3in;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08);
          overflow: hidden;
        }
        
        .recipe-header {
          margin-bottom: 0.2in;
          position: relative;
        }
        
        .recipe-name {
          font-size: 20pt;
          font-weight: 700;
          margin-bottom: 0.1in;
          color: #1e293b;
          line-height: 1.2;
        }
        
        .meta-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(1.2in, 1fr));
          gap: 0.15in;
          margin: 0.2in 0;
          background-color: #f8fafc;
          padding: 0.15in;
          border-radius: 8px;
        }
        
        .meta-item {
          display: flex;
          flex-direction: column;
        }
        
        .meta-label {
          font-weight: 600;
          font-size: 8pt;
          text-transform: uppercase;
          color: #64748b;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }
        
        .meta-value {
          font-size: 12pt;
          font-weight: 600;
          color: #0f172a;
        }
        
        .section {
          margin-bottom: 0.2in;
          padding-bottom: 0.15in;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .section:last-of-type {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        
        .section-label {
          font-weight: 600;
          font-size: 10pt;
          color: #64748b;
          margin-bottom: 0.1in;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .section-content {
          font-size: 11pt;
          color: #334155;
          line-height: 1.4;
        }
        
        .allergens-container {
          margin-top: 0.2in;
          padding: 0.1in 0.15in;
          background-color: #fff1f2;
          border-radius: 6px;
          border-left: 4px solid #f43f5e;
          display: flex;
          align-items: center;
        }
        
        .allergen-icon {
          margin-right: 8px;
          font-weight: bold;
          color: #e11d48;
          font-size: 12pt;
        }
        
        .allergen-text {
          font-size: 9pt;
          color: #9f1239;
          font-weight: 500;
        }
        
        .dates-container {
          display: flex;
          justify-content: space-between;
          margin-top: 0.2in;
          background-color: #f0f9ff;
          border-radius: 6px;
          padding: 0.1in;
        }
        
        .date-item {
          display: flex;
          flex-direction: column;
        }
        
        .date-label {
          font-weight: 600;
          font-size: 8pt;
          text-transform: uppercase;
          color: #0369a1;
          letter-spacing: 0.5px;
        }
        
        .date-value {
          font-size: 11pt;
          font-weight: 500;
          color: #0c4a6e;
        }
        
        .expiration-date {
          font-weight: 700;
          color: #0e7490;
        }
        
        .qr-container {
          margin: 0.2in auto 0.1in;
          text-align: center;
        }
        
        .qr-placeholder {
          margin: 0 auto;
          width: 0.8in;
          height: 0.8in;
          background-color: #f8fafc;
          border: 1px dashed #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 7pt;
          color: #64748b;
          text-align: center;
          border-radius: 8px;
        }
        
        .recipe-id {
          font-size: 7pt;
          color: #94a3b8;
          text-align: center;
          margin-top: 4px;
        }
        
        .label-footer {
          margin-top: 0.15in;
          font-size: 7pt;
          color: #94a3b8;
          text-align: center;
        }
        
        .divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #e2e8f0, transparent);
          margin: 0.2in 0;
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
            padding: 0.2in;
            border-radius: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="no-print">
        <button class="print-button" onclick="window.print(); return false;">
          Print Recipe Label
        </button>
      </div>
      
      <div class="label-container">
        <div class="recipe-header">
          <div class="recipe-name">${recipe.name}</div>
        </div>
        
        <div class="meta-grid">
          <div class="meta-item">
            <span class="meta-label">Servings</span>
            <span class="meta-value">${recipe.servings}</span>
          </div>
          
          <div class="meta-item">
            <span class="meta-label">Time</span>
            <span class="meta-value">${recipe.prepTime + recipe.cookTime} min</span>
          </div>
          
          ${hasNutrition ? `
          <div class="meta-item">
            <span class="meta-label">Calories</span>
            <span class="meta-value">${new Intl.NumberFormat('en').format(Math.round(recipe.nutritionalInfo.calories))}</span>
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
        
        ${allergens.length > 0 ? `
        <div class="allergens-container">
          <div class="allergen-icon">⚠️</div>
          <div class="allergen-text">
            <strong>Contains:</strong> ${allergens.join(', ')}
          </div>
        </div>
        ` : ''}
        
        <div class="dates-container">
          <div class="date-item">
            <span class="date-label">Prepared</span>
            <span class="date-value">${preparationDate.toLocaleDateString()}</span>
          </div>
          
          ${expirationDate ? `
          <div class="date-item">
            <span class="date-label">Best Before</span>
            <span class="date-value expiration-date">${expirationDate.toLocaleDateString()}</span>
          </div>
          ` : ''}
        </div>
        
        <div class="qr-container">
          <div class="qr-placeholder">QR Code</div>
          <div class="recipe-id">ID: ${recipe.id}</div>
        </div>
        
        <div class="label-footer">
          Made with love • Store properly • Enjoy!
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
