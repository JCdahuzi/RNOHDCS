import React, { useState, useRef } from 'react';
import { View, Text } from 'react-native'
import ScrollableTabView, { DefaultTabBar } from '@itenl/react-native-scrollable-tabview';
import { Tester, TestSuite, TestCase } from '@rnoh/testerino';

class Screen1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: Date.now(),
        };
    }

    onRefresh = (toggled) => {
        this.toggled = toggled;
        this.toggled && this.toggled();
        this.toggled && this.toggled();
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'red',
                    height: 2000
                }}
            >
                <Text>
                    第一个页面
                </Text>
            </View>
        );
    }
}

class Screen2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: Date.now(),
        };
    }

    onRefresh = (toggled) => {
        this.toggled = toggled;
        this.toggled && this.toggled();
        this.toggled && this.toggled();
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'grey',
                    height: 2000
                }}
            >
                <Text>
                    第二个页面
                </Text>
            </View>
        );
    }
}

export default class ScrollableTabviewExample6 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rootTime: Date.now(),
            stacks: [],
            firstIndex: 1,
            useScroll: false,
            scroll: "0",
            scroll2Horizontal: "0",
            errorText: ''
        };
    }

    initStacks() {
        return [
            {
                screen: Screen1,
                tabLabel: "Screen1",
            },
            {
                screen: Screen2,
                tabLabel: "Screen2",
            }
        ];
    }

    componentDidMount() {
        this.setState({
            stacks: this.initStacks(),
        });
        setTimeout(() => {
            const stacks = this.state.stacks;
            if (stacks && stacks[1]) {
                stacks[1].tabLabelRender = (tabLabel) => {
                    return `${tabLabel}`;
                };
                this.setState({
                    stacks,
                });
            }
        }, 5000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        return (
            <Tester>
                <TestSuite name="TesterScrollableTabviewExample6">
                    <TestCase
                        tags={['C_API']}
                        itShould="header处固定,不随上滑而隐藏.使用前,请先点击Sceen1,Sceen2,加载对应页面">
                        <View style={{ width: '100%', height: 500 }}>
                            <ScrollableTabView
                                stacks={this.state.stacks}
                                firstIndex={this.state.firstIndex}
                                mappingProps={{}}
                                tabsStyle={{ backgroundColor: 'yellow', }}
                                tabWrapStyle={{ zIndex: 1 }}
                                tabInnerStyle={{ paddingLeft: 5 }}
                                tabActiveOpacity={0}
                                tabStyle={{ backgroundColor: 'orange', width: 100 }}
                                textStyle={{ textAlign: 'center', color: 'green' }}
                                textActiveStyle={{ fontSize: 30 }}
                                tabUnderlineStyle={{ backgroundColor: 'yellow', height: 80 }}
                                onBeforeEndReached={next => {
                                    next();
                                }}
                                syncToSticky={true}
                                onTabviewChanged={() => {
                                }}
                                fixedHeader={true}
                                screenScrollThrottle={50}
                                fillScreen={false}
                                header={() => {
                                    return <View style={{ backgroundColor: 'pink', height: 80 }}><Text>header</Text></View>;
                                }}
                                carouselProps={{}}
                                sectionListProps={{}}
                                toHeaderOnTab={false}
                                tabsShown={true}
                            ></ScrollableTabView>
                        </View>
                    </TestCase>
                </TestSuite>
            </Tester>
        );
    }
}

console.disableYellowBox = true;