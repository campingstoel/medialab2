// DistanceBar.js

import React from 'react';
import { View } from 'react-native';
import index from '../styles'; // Assuming you have your styles imported here
import { AuthStore } from '../data/authStore';
import {haversineDistance} from "../harversineDistance";

const DistanceBar = () => {
    const { user, users } = AuthStore.useState();

    const calculateClosestDistance = () => {
        if (!user || users.length === 0) return Infinity;

        let closestDistance = Infinity;
        const userLocation = user.location;

        users.forEach(otherUser => {
            if (otherUser.uid !== user.uid && otherUser.location) {
                const distance = haversineDistance(
                    userLocation.latitude,
                    userLocation.longitude,
                    otherUser.location.latitude,
                    otherUser.location.longitude
                );
                if (distance < closestDistance) {
                    closestDistance = distance;
                }
            }
        });

        return closestDistance;
    };

    const closestDistance = calculateClosestDistance();
    let backgroundColor = '#00FF00'; // Green by default

    if (closestDistance < 1) {
        backgroundColor = '#FF0000'; // Red if within 1 km
    } else if (closestDistance < 5) {
        backgroundColor = '#FFA500'; // Orange if within 5 km
    }

    return (
        <View
            style={[
                index.fullWidth,
                index.centered,
                index.bgBlack,
                index.pad10,
                { backgroundColor },
            ]}
        />
    );
};

export default DistanceBar;
