import React, {Component} from 'react';
import './App.css';
import getRandomNum from "./random";

const members = [
    "chandler", "ada", "adam", "admond",
    "baihui", "cutey", "dingjun", "ganghan",
    "jake", "jeanne", "lisas", "maureen",
    "messi", "nic", "rachel", "ryanj",
    "sukie", "wendy", "wengang", "wiwi",
    "yinyin"
];

class RowItem extends Component {
    render() {
        const {content, activeId, id, historyId} = this.props;
        let className = "row__item";
        if (activeId.indexOf(id) !== -1) {
            className += " row__item-active";
        } else if (historyId.indexOf(id) !== -1) {
            className += " row__item-disabled";
        }
        return (
            <div className={className} id={`row_item_${content}`}>
                {content}
            </div>
        )
    }
}

class App extends Component {
    constructor() {
        super();
        this.runTimes = 0;
        this.prizeId = [];
        this.runList = [];
        this.historyIdTmp = [];
        this.state = {
            // 被选中的格子的ID
            activeId: [],
            // 是否正在抽奖
            isRolling: false,
            //历史中奖id
            historyId: [],
            prizeCount: 3
        };
        this.animate = this.animate.bind(this);
        this.openPrize = this.openPrize.bind(this);
        this.handleBegin = this.handleBegin.bind(this);
        this.handlerRestore = this.handlerRestore.bind(this);
        this.handlePrizeCount = this.handlePrizeCount.bind(this);
    }

    handlerRestore() {
        this.runTimes = 0;
        this.prizeId = [];
        this.runList = [];
        this.setState({
            activeId: [],
            // 是否正在抽奖
            isRolling: false,
            historyId: [],
        });
    }

    handleBegin() {
        if (this.state.isRolling) {
            this.setState({
                isRolling: false
            });
            return;
        }
        this.runTimes = 0;
        this.runList = [];
        let activeId = [];
        // 随机获取一个中奖ID
        this.prizeId = getRandomNum(members.length, this.state.prizeCount, this.state.historyId);
        if (this.prizeId.length === 0) {
            alert("所有人都已经抽取完毕");
            return;
        }
        this.historyIdTmp = this.prizeId;
        for (let i = 0; i < this.historyIdTmp.length; i++) {
            this.runList.push(true);
            activeId.push(0);
        }
        if (!this.state.isRolling) {
            this.setState({
                activeId: activeId,
                isRolling: true
            }, () => {
                this.animate();
            })
        }
    }

    handlePrizeCount(num) {
        this.setState({
            prizeCount: num
        });
    }

    animate() {
        this.runTimes += 1;
        let activeId = Object.assign([], this.state.activeId);
        for (let i = 0; i < this.historyIdTmp.length; i++) {
            if (!this.runList[i]) {
                continue;
            }
            let rate = i + 1;
            if (this.runTimes % rate !== 0) {
                continue;
            }
            let count = activeId[i];
            count = (count + 1) % members.length;
            activeId[i] = count;
        }
        if (!this.state.isRolling) {
            this.openPrize(activeId);
        }
        this.setState(
            {
                activeId
            }
            , () => {
                if (this.runList.some(t => t)) {
                    setTimeout(this.animate, 5);
                } else {
                    let historyId = this.state.historyId.concat(this.historyIdTmp);
                    this.setState({
                        historyId: Object.assign([], historyId)
                    });
                }
            });

    }

    openPrize(activeId) {
        let prizeId = [];
        for (let i = 0; i < this.prizeId.length; i++) {
            let prize = this.prizeId[i];
            let pos = activeId.indexOf(prize);
            if (pos > -1 && this.runList[pos]) {
                this.runList[pos] = false;
            } else {
                prizeId.push(prize);
            }
        }
        this.prizeId = prizeId;
    }

    render() {
        const {activeId, isRolling, historyId} = this.state;
        return (
            <div className="App">
                <button className="restore__btn" onClick={() => this.handlerRestore()}>
                    复位
                </button>
                <div className="prize">
                    <div className="prize__container">
                        <div className="container__area">
                            <button className={isRolling ? "begin__btn btn_disabled" : "begin__btn"}
                                    onClick={() => this.handleBegin()}>
                                {isRolling ? "点击停止" : "点击开始"}
                            </button>
                            <div className="area__row">
                                <RowItem content={members[0]} id={0} activeId={activeId} historyId={historyId}/>
                                <RowItem content={members[1]} id={1} activeId={activeId} historyId={historyId}/>
                                <RowItem content={members[2]} id={2} activeId={activeId} historyId={historyId}/>
                                <RowItem content={members[3]} id={3} activeId={activeId} historyId={historyId}/>
                                <RowItem content={members[4]} id={4} activeId={activeId} historyId={historyId}/>
                                <RowItem content={members[5]} id={5} activeId={activeId} historyId={historyId}/>
                            </div>
                            <div className="area__row">
                                <RowItem content="空白" id={2222} activeId={activeId} historyId={historyId}/>
                                <RowItem content={members[6]} id={6} activeId={activeId} historyId={historyId}/>
                            </div>
                            <div className="area__row">
                                <RowItem content={members[20]} id={20} activeId={activeId} historyId={historyId}/>
                                <RowItem content={members[7]} id={7} activeId={activeId} historyId={historyId}/>
                            </div>
                            <div className="area__row">
                                <RowItem content={members[19]} id={19} activeId={activeId} historyId={historyId}/>
                                <RowItem content={members[8]} id={8} activeId={activeId} historyId={historyId}/>
                            </div>
                            <div className="area__row">
                                <RowItem content={members[18]} id={18} activeId={activeId} historyId={historyId}/>
                                <RowItem content={members[9]} id={9} activeId={activeId} historyId={historyId}/>
                            </div>
                            <div className="area__row">
                                <RowItem content={members[17]} id={17} activeId={activeId} historyId={historyId}/>
                                <RowItem content={members[10]} id={10} activeId={activeId} historyId={historyId}/>
                            </div>
                            <div className="area__row">
                                <RowItem content={members[16]} id={16} activeId={activeId} historyId={historyId}/>
                                <RowItem content={members[15]} id={15} activeId={activeId} historyId={historyId}/>
                                <RowItem content={members[14]} id={14} activeId={activeId} historyId={historyId}/>
                                <RowItem content={members[13]} id={13} activeId={activeId} historyId={historyId}/>
                                <RowItem content={members[12]} id={12} activeId={activeId} historyId={historyId}/>
                                <RowItem content={members[11]} id={11} activeId={activeId} historyId={historyId}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="num-btn-group">
                    中奖人数设置:
                    <span className="num-btn-group-inner">
                        <button className={this.state.prizeCount === 1 ? "active" : ""}
                                onClick={() => this.handlePrizeCount(1)}>
                            1人
                        </button>
                        <button className={this.state.prizeCount === 2 ? "active" : ""}
                                onClick={() => this.handlePrizeCount(2)}>
                            2人
                        </button>
                        <button className={this.state.prizeCount === 3 ? "active" : ""}
                                onClick={() => this.handlePrizeCount(3)}>
                            3人
                        </button>
                        <button className={this.state.prizeCount === 4 ? "active" : ""}
                                onClick={() => this.handlePrizeCount(4)}>
                            4人
                        </button>
                    </span>
                </div>
            </div>
        );
    }
}

export default App;
