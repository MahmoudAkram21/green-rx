# Drug Interaction Service Improvement Plan

## Current Problem
The `checkDrugInteractions` function uses hardcoded drug lists that only check for specific drug names. This causes false negatives where real interactions are missed for drugs not in the predefined lists.

## Additional Problem Identified
The `checkDiseaseWarnings` function has hardcoded disease name patterns ('renal', 'liver', 'hepatic') which should be database-driven instead.

## Proposed Solution

### 1. Drug Interactions: Replace hardcoded drug classification with dynamic field-based searching through all available interaction fields in the database.

### 2. Disease Warnings: Remove hardcoded disease patterns and rely entirely on database-driven disease warnings where:
- Admins can add diseases and their severity levels through the database
- Patients select their diseases from the database
- Disease-drug warnings are stored in `diseaseActiveSubstanceWarnings` table
- Severity comes from the database configuration, not hardcoded

## Implementation Plan

### 1. Drug Interactions - Dynamic Field Discovery
- Create a comprehensive list of all interaction fields from the Prisma schema
- Map field names to readable drug class names
- Handle both JSON fields (with translations) and string fields

### 2. Field Types to Handle

#### JSON Fields (with translations):
```typescript
const jsonInteractionFields = [
  'interactionVitaminsFood', 'interactionBisphosphonates', 'interactionAlcohol',
  'interactionMuscleRelaxant', 'interactionRetinoids', 'interactionCorticosteroids',
  'interactionXanthines', 'interactionSympathomimetics', 'interactionAnticholinergic',
  'interactionChemotherapy', 'interactionAntibiotics', 'interactionHormones',
  'interactionStatins', 'interactionAntihypertensive', 'interactionAntidiuretics',
  'interactionAntidepressant', 'interactionAntidiabetic', 'interactionLowBloodSugarAgents',
  'interactionDigoxin', 'interactionAnticoagulant', 'interactionNSAIDs',
  'interactionImmunosuppressive', 'interactionAntacids', 'interactionUricosurics',
  'interactionProtectants', 'interactionAntiParkinson', 'interactionHIVProtease',
  'interactionBloodProduct', 'interactionVaccines', 'interactionAnthelmintics',
  'interactionPDE5Inhibitors'
];
```

#### String Fields (no translations):
```typescript
const stringInteractionFields = ['ironChelator'];
```

### 3. Field Name to Class Mapping
```typescript
const fieldToClassMap = {
  'interactionVitaminsFood': 'Vitamins/Food',
  'interactionBisphosphonates': 'Bisphosphonate',
  'interactionAlcohol': 'Alcohol',
  'interactionMuscleRelaxant': 'Muscle Relaxant',
  'interactionRetinoids': 'Retinoid',
  'interactionCorticosteroids': 'Corticosteroid',
  'interactionXanthines': 'Xanthine',
  'interactionSympathomimetics': 'Sympathomimetic',
  'interactionAnticholinergic': 'Anticholinergic',
  'interactionChemotherapy': 'Chemotherapy',
  'interactionAntibiotics': 'Antibiotic',
  'interactionHormones': 'Hormone',
  'interactionStatins': 'Statin',
  'interactionAntihypertensive': 'Antihypertensive',
  'interactionAntidiuretics': 'Antidiuretic',
  'interactionAntidepressant': 'Antidepressant',
  'interactionAntidiabetic': 'Antidiabetic',
  'interactionLowBloodSugarAgents': 'Low Blood Sugar Agent',
  'interactionDigoxin': 'Digoxin',
  'interactionAnticoagulant': 'Anticoagulant',
  'interactionNSAIDs': 'NSAID',
  'interactionImmunosuppressive': 'Immunosuppressive',
  'interactionAntacids': 'Antacid',
  'interactionUricosurics': 'Uricosuric',
  'interactionProtectants': 'Protectant',
  'interactionAntiParkinson': 'Anti-Parkinson',
  'interactionHIVProtease': 'HIV Protease Inhibitor',
  'interactionBloodProduct': 'Blood Product',
  'interactionVaccines': 'Vaccine',
  'interactionAnthelmintics': 'Anthelmintic',
  'interactionPDE5Inhibitors': 'PDE5 Inhibitor',
  'ironChelator': 'Iron Chelator'
};
```

### 4. Search Logic
For each current medication:
1. **JSON Fields**: Extract English text (`"en"` value) and search for current drug name
2. **String Fields**: Search directly in the string value
3. **Case-insensitive matching**: Use `toLowerCase()` for robust matching
4. **Generate warnings/alerts** when matches are found

### 5. New Function Structure
```typescript
private async checkDrugInteractions(patient: any, newDrug: ActiveSubstance): Promise<{
  warnings: DrugWarning[];
  alerts: DrugAlert[];
}> {
  const warnings: DrugWarning[] = [];
  const alerts: DrugAlert[] = [];

  // Get current medications
  const currentMeds = patient.prescriptions.map((p: any) => p.tradeName.activeSubstance);

  // Check all interaction fields
  const allInteractionFields = [...jsonInteractionFields, ...stringInteractionFields];

  for (const currentDrug of currentMeds) {
    for (const field of allInteractionFields) {
      const interactionData = (newDrug as any)[field];
      
      if (interactionData) {
        let searchText = '';
        let interactionText = '';
        
        if (jsonInteractionFields.includes(field)) {
          // Handle JSON field with translations
          const parsed = typeof interactionData === 'string' 
            ? JSON.parse(interactionData) 
            : interactionData;
          searchText = parsed.en || '';
          interactionText = parsed.en || '';
        } else {
          // Handle string field
          searchText = interactionData;
          interactionText = interactionData;
        }
        
        // Search for current drug name in the interaction text
        if (searchText.toLowerCase().includes(currentDrug.activeSubstance.toLowerCase())) {
          const drugClass = fieldToClassMap[field] || field.replace('interaction', '');
          
          warnings.push({
            type: 'interaction',
            severity: 'high',
            message: `Drug Interaction with ${drugClass}: ${interactionText}`,
            affectedDrug: newDrug.activeSubstance,
            conflictingDrug: currentDrug.activeSubstance
          });

          alerts.push({
            interactionType: drugClass,
            severity: 'Major',
            message: `Interaction detected between ${newDrug.activeSubstance} and ${currentDrug.activeSubstance}`,
            requiresAcknowledgement: true
          });
        }
      }
    }
  }

  return { warnings, alerts };
}
```

### 6. Benefits of This Approach
- **Comprehensive**: Checks all available interaction fields
- **Dynamic**: No hardcoded drug lists needed
- **Translation-aware**: Handles both JSON (with translations) and string fields
- **Maintainable**: Easy to add new interaction fields without code changes
- **Accurate**: Reduces false negatives by searching actual interaction data

### 7. Disease Warnings - Database-Driven Approach

#### Current Issues:
- Hardcoded disease name patterns: `'renal'`, `'liver'`, `'hepatic'`
- Fixed warning field names: `renalWarning`, `hepaticWarning`
- Limited to specific disease variations

#### Solution:
Remove all hardcoded disease matching and rely entirely on the existing database-driven system:

```typescript
private async checkDiseaseWarnings(
    patient: any,
    drug: ActiveSubstance
): Promise<DrugWarning[]> {
    const warnings: DrugWarning[] = [];

    for (const patientDisease of patient.patientDiseases) {
        const diseaseWarnings = patientDisease.disease.diseaseActiveSubstanceWarnings;

        for (const warning of diseaseWarnings) {
            const warningFieldValue = (drug as any)[warning.warningFieldName];

            if (warningFieldValue) {
                warnings.push({
                    type: 'disease',
                    severity: warning.severity.toLowerCase() as any,
                    message: `Disease Warning (${patientDisease.disease.name}): ${warning.warningMessage}. ` +
                        `Additional info: ${warningFieldValue}`,
                    affectedDrug: drug.activeSubstance
                });
            }
        }
    }

    return warnings;
}
```

#### Benefits:
- **Admin-configurable**: Diseases and severities managed through database
- **Flexible**: No hardcoded patterns to maintain
- **Scalable**: Easy to add new disease-drug interactions
- **Consistent**: Uses existing database structure

### 8. Combined Benefits
- **Zero Hardcoding**: Both drug interactions and disease warnings are database-driven
- **Admin Control**: All rules and severities managed through database interface
- **Comprehensive Coverage**: Checks all available interaction fields dynamically
- **Maintainable**: No code changes needed for new drugs, diseases, or interactions
- **Accurate**: Reduces false negatives by searching actual interaction data
- **Scalable**: Easy to extend with new interaction categories or disease types

### 9. Edge Cases to Handle
- Empty or null interaction fields
- Malformed JSON data
- Case sensitivity in drug names
- Partial matches vs exact matches
- Multiple drugs mentioned in the same interaction text

### 10. Testing Strategy
- Test with drugs that have interaction data in various fields
- Test case-insensitive matching
- Test with malformed JSON
- Test with empty/null fields
- Verify no false positives for unrelated drugs

## Implementation Steps
1. **Drug Interactions**: Create the field mappings and constants
2. **Drug Interactions**: Implement the new search logic for all interaction fields
3. **Disease Warnings**: Remove hardcoded disease patterns
4. **Drug Interactions**: Add error handling for malformed JSON data
5. **Both**: Write comprehensive tests
6. **Both**: Deploy and monitor for accuracy
7. **Documentation**: Update admin documentation for database configuration
