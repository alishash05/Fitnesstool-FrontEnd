// components/SubscriptionCountdown.js
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';

export default function SubscriptionCountdown({ subscriptionDate, active = true }) {
  const [daysLeft, setDaysLeft] = useState(0);

  const calculateDaysLeft = () => {
    if (!subscriptionDate) return 0;
    const start = new Date(subscriptionDate);
    const expiry = new Date(start);
    expiry.setMonth(expiry.getMonth() + 1); // 1-month validity
    const today = new Date();
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  useEffect(() => {
    setDaysLeft(calculateDaysLeft());

    // Optional: auto-refresh every 12 hours (adjust if needed)
    const interval = setInterval(() => {
      setDaysLeft(calculateDaysLeft());
    }, 12 * 60 * 60 * 1000); // every 12 hours

    return () => clearInterval(interval);
  }, [subscriptionDate]);

  if (!active) {
    return <Text style={[styles.text, { color: '#9CA3AF' }]}>Inactive</Text>;
  }

  if (daysLeft === 0) {
    return <Text style={[styles.text, { color: '#DC2626' }]}>Expired</Text>;
  }

  const color = daysLeft <= 5 ? '#DC2626' : '#16A34A'; // Red if close to expiry
  return <Text style={[styles.text, { color }]}>{daysLeft} days left</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});
