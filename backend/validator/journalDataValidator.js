export const validateJournalData = (data) => {
    const errors = [];
    const {mood, stressLevel, energyLevel, triggers, gratitude, copingActivities, sleepQuality, reflection } = data;
    
    // Validate mood
    const validMoods = ["happy", "sad", "anxious", "angry", "calm", "neutral", "excited"];
    if (mood && !validMoods.includes(mood)) {
        errors.push("Invalid mood value.");
    }
    // Validate stressLevel
    if (stressLevel && (isNaN(stressLevel) || stressLevel < 1 || stressLevel > 10)) {
        errors.push("Stress level must be a number between 1 and 10.");
    }
    // Validate energyLevel
    if (energyLevel && (isNaN(energyLevel) || energyLevel < 1 || energyLevel > 10)) {
        errors.push("Energy level must be a number between 1 and 10.");
    }
    // Validate sleepQuality
    const validSleepQualities = ["poor", "average", "good", "excellent"];
    if (sleepQuality && !validSleepQualities.includes(sleepQuality)) {
        errors.push("Invalid sleep quality value.");
    }
    // Validate text fields length
    if (triggers && triggers.length > 1000) {
        errors.push("Triggers text is too long (max 1000 characters).");
    }
    if (gratitude && gratitude.length > 1000) {
        errors.push("Gratitude text is too long (max 1000 characters).");
    }
    if (reflection && reflection.length > 2000) {
        errors.push("Reflection text is too long (max 2000 characters).");
    }
    // Validate copingActivities
    if (copingActivities && !Array.isArray(copingActivities)) {
        errors.push("Coping activities must be an array.");
    }
    if (copingActivities && copingActivities.length > 10) {
        errors.push("Too many coping activities (max 10)");
    
    }
    if (copingActivities && copingActivities.some(activity => typeof activity !== 'string' || activity.length > 100)){
        errors.push("Each coping activity must be a string (max 100 characters).");
    }

    return errors;
};

