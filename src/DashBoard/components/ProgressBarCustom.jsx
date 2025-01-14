import React, { useState, useEffect } from 'react';
import { Flex, Progress } from 'antd';

function ProgressBarCustom() {
    const [progressValues, setProgressValues] = useState({
        passionForHelping: 0,
        goalOriented: 0,
        timeManagement: 0,
        creativeExpression: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setProgressValues(prevValues => {
                const nextValues = {
                    passionForHelping: Math.min(prevValues.passionForHelping + 1, 70),
                    goalOriented: Math.min(prevValues.goalOriented + 1, 85),
                    timeManagement: Math.min(prevValues.timeManagement + 1, 50),
                    creativeExpression: Math.min(prevValues.creativeExpression + 1, 90),
                };

                if (
                    nextValues.passionForHelping === 70 &&
                    nextValues.goalOriented === 85 &&
                    nextValues.timeManagement === 50 &&
                    nextValues.creativeExpression === 90
                ) {
                    clearInterval(interval);
                }

                return nextValues;
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='mr-12'>
            <Flex vertical gap="small">
                <p>Passion for Helping Others:</p>
                <Progress
                    percent={progressValues.passionForHelping}
                    strokeColor="#62c6ff"
                />
                <p>Goal-Oriented:</p>
                <Progress
                    percent={progressValues.goalOriented}
                    strokeColor="#62c6ff"
                />
                <p>Challenges with Time Management:</p>
                <Progress
                    percent={progressValues.timeManagement}
                    strokeColor="#62c6ff"
                />
                <p>Creative Expression:</p>
                <Progress
                    percent={progressValues.creativeExpression}
                    strokeColor="#62c6ff"
                />
            </Flex>
        </div>
    );
}

export default ProgressBarCustom;
