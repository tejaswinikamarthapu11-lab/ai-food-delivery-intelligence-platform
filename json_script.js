const orderValue = Number($json.order_value);
const finalAmount = Number($json.final_amount_paid);

const deliveryTime = Number($json.delivery_time_minutes);
const estimatedTime = Number($json.estimated_delivery_time);

const customerRating = Number($json.customer_rating);
const restaurantRating = Number($json.restaurant_rating);

const trafficScore = Number($json.traffic_level_score);
const weatherScore = Number($json.weather_severity_score);

const discount = Number($json.discount_amount);
const tip = Number($json.tip_amount);

const efficiency = Number($json.delivery_efficiency_score);

const delayed = Number($json.delayed_delivery_flag);
const refund = Number($json.refund_flag);

const festival = Number($json.festival_or_weekend_flag);

// Calculate delay
const delayMinutes = deliveryTime - estimatedTime;

// ===============================
// ANOMALY DETECTION
// ===============================

let anomalies = [];

// Detect major delivery delay
if (delayMinutes > 15) {
  anomalies.push("Major delivery delay detected");
}

// Detect poor customer experience
if (customerRating < 3) {
  anomalies.push("Low customer satisfaction detected");
}

// Detect poor restaurant performance
if (restaurantRating < 3) {
  anomalies.push("Poor restaurant performance detected");
}

// Detect refund issue
if (refund === 1) {
  anomalies.push("Refund risk/order issue detected");
}

// Detect severe traffic
if (trafficScore > 8) {
  anomalies.push("Heavy traffic affecting delivery");
}

// Detect severe weather
if (weatherScore > 8) {
  anomalies.push("Extreme weather disruption detected");
}

// Detect low delivery efficiency
if (efficiency < 50) {
  anomalies.push("Low delivery efficiency detected");
}

// Detect suspicious high delay
if (deliveryTime > 90) {
  anomalies.push("Unusually high delivery time");
}

// Detect high discount abuse
if (discount > orderValue * 0.5) {
  anomalies.push("High discount usage detected");
}

// Detect unhappy customer
if (tip === 0 && customerRating < 3) {
  anomalies.push("Possible unhappy customer");
}

// ===============================
// RISK LEVEL
// ===============================

let riskLevel = "Low";

if (anomalies.length >= 3) {
  riskLevel = "High";
} else if (anomalies.length >= 1) {
  riskLevel = "Medium";
}

// ===============================
// PRIORITY LEVEL
// ===============================

let priorityLevel = "Low";

if (riskLevel === "High") {
  priorityLevel = "Critical";
} else if (riskLevel === "Medium") {
  priorityLevel = "Moderate";
}

// ===============================
// DELIVERY STATUS
// ===============================

let deliveryStatus = "On Time";

if (delayMinutes > 10) {
  deliveryStatus = "Delayed";
}

// ===============================
// BUSINESS SCORE ENGINE
// ===============================

let businessScore = 100;

if (delayMinutes > 15) businessScore -= 20;

if (customerRating < 3) businessScore -= 15;

if (restaurantRating < 3) businessScore -= 10;

if (refund === 1) businessScore -= 25;

if (trafficScore > 8) businessScore -= 10;

if (weatherScore > 8) businessScore -= 10;

if (efficiency < 50) businessScore -= 15;

if (businessScore < 0) {
  businessScore = 0;
}

// ===============================
// PERFORMANCE STATUS
// ===============================

let performanceStatus = "Excellent";

if (businessScore < 80) {
  performanceStatus = "Good";
}

if (businessScore < 60) {
  performanceStatus = "Average";
}

if (businessScore < 40) {
  performanceStatus = "Poor";
}

// ===============================
// AI RECOMMENDATIONS ENGINE
// ===============================

let recommendations = [];

// Delivery delay recommendation
if (delayMinutes > 15) {
  recommendations.push(
    "Optimize delivery routes and increase delivery staff during peak traffic hours."
  );
}

// Customer satisfaction recommendation
if (customerRating < 3) {
  recommendations.push(
    "Improve customer support response and monitor delayed deliveries more closely."
  );
}

// Restaurant quality recommendation
if (restaurantRating < 3) {
  recommendations.push(
    "Review restaurant preparation quality and improve food handling standards."
  );
}

// Traffic recommendation
if (trafficScore > 8) {
  recommendations.push(
    "Use dynamic GPS route optimization during heavy traffic conditions."
  );
}

// Weather recommendation
if (weatherScore > 8) {
  recommendations.push(
    "Prepare weather contingency plans and proactively inform customers about delays."
  );
}

// Refund recommendation
if (refund === 1) {
  recommendations.push(
    "Investigate refund causes and improve order accuracy monitoring."
  );
}

// Low efficiency recommendation
if (efficiency < 50) {
  recommendations.push(
    "Monitor delivery partner performance and improve operational efficiency."
  );
}

// High discount recommendation
if (discount > orderValue * 0.5) {
  recommendations.push(
    "Review promotional campaigns to avoid excessive discount usage."
  );
}

// Unhappy customer recommendation
if (tip === 0 && customerRating < 3) {
  recommendations.push(
    "Provide recovery offers or personalized support for dissatisfied customers."
  );
}

// Festival recommendation
if (festival === 1) {
  recommendations.push(
    "Increase delivery staffing and inventory preparation during festival or weekend demand spikes."
  );
}

// ===============================
// EXECUTIVE SUMMARY
// ===============================

let executiveSummary =
  `Delivery performance is currently ${performanceStatus}. ` +
  `The operational business score is ${businessScore}/100 with ${riskLevel} risk conditions detected. ` +
  `Primary operational concerns include: ${anomalies.join(", ")}.`;

// ===============================
// RETURN OUTPUT
// ===============================

return [{
  json: {
    orderValue,
    finalAmount,

    deliveryTime,
    estimatedTime,
    delayMinutes,
    deliveryStatus,

    customerRating,
    restaurantRating,

    trafficScore,
    weatherScore,

    discount,
    tip,

    efficiency,

    delayed,
    refund,
    festival,

    anomalies,
    riskLevel,
    priorityLevel,

    businessScore,
    performanceStatus,

    recommendations,

    executiveSummary
  }
}];