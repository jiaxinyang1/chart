import React, { Component } from 'react';
import G6 from '@antv/g6';
import Hierarchy from '@antv/hierarchy';

class G6chart extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            select_list:new Set()

        }
    }
    data = {
        "name": "Modeling Methods",
        "children": [{
            "name": "Classification",
            "children": [{
                "name": "Logistic regression"
            }, {
                "name": "Linear discriminant analysis"
            }, {
                "name": "Rules"
            }, {
                "name": "Decision trees"
            }, {
                "name": "Naive Bayes"
            }, {
                "name": "K nearest neighbor"
            }, {
                "name": "Probabilistic neural network"
            }, {
                "name": "Support vector machine"
            }]
        }, {
            "name": "Consensus",
            "children": [{
                "name": "Models diversity",
                "children": [{
                    "name": "Different initializations"
                }, {
                    "name": "Different parameter choices"
                }, {
                    "name": "Different architectures"
                }, {
                    "name": "Different modeling methods"
                }, {
                    "name": "Different training sets"
                }, {
                    "name": "Different feature sets"
                }]
            }, {
                "name": "Methods",
                "children": [{
                    "name": "Classifier selection"
                }, {
                    "name": "Classifier fusion"
                }]
            }, {
                "name": "Common",
                "children": [{
                    "name": "Bagging"
                }, {
                    "name": "Boosting"
                }, {
                    "name": "AdaBoost"
                }]
            }]
        }, {
            "name": "Regression",
            "children": [{
                "name": "Multiple linear regression"
            }, {
                "name": "Partial least squares"
            }, {
                "name": "Multi-layer feedforward neural network"
            }, {
                "name": "General regression neural network"
            }, {
                "name": "Support vector regression"
            }]
        }]
    }
    COLLAPSE_ICON = function COLLAPSE_ICON(x, y, r) {
        return [['M', x, y], ['a', r, r, 0, 1, 0, r * 2, 0], ['a', r, r, 0, 1, 0, -r * 2, 0], ['M', x + 2, y], ['L', x + 2 * r - 2, y]];
    };
    EXPAND_ICON = function EXPAND_ICON(x, y, r) {
        return [['M', x, y], ['a', r, r, 0, 1, 0, r * 2, 0], ['a', r, r, 0, 1, 0, -r * 2, 0], ['M', x + 2, y], ['L', x + 2 * r - 2, y], ['M', x + r, y - r + 2], ['L', x + r, y + r - 2]];
    };

    componentDidMount() {

        this.rednerG6();
        this.rednerG6Data();
    }

    rednerG6Data = () => {
        let self =this;
        const {onSelected}=this.props;
        let graph = new G6.TreeGraph({

            container: 'mountNode',
            width: window.innerWidth,
            height: window.innerHeight,
            modes: {
                default: [ 'drag-canvas', 'zoom-canvas']
            },
            defaultNode: {
                shape: 'tree-node',
                anchorPoints: [[0, 0.5], [1, 0.5]]
            },
            defaultEdge: {
                shape: 'cubic-horizontal'
            },
            edgeStyle: {
                default: {
                    stroke: '#A3B1BF'
                }
            },
            layout: function layout(data) {
                return Hierarchy.compactBox(data, {
                    direction: 'LR',
                    getId: function getId(d) {
                        return d.id;
                    },
                    getHeight: function getHeight() {
                        return 16;
                    },
                    getWidth: function getWidth() {
                        return 16;
                    },
                    getVGap: function getVGap() {
                        return 20;
                    },
                    getHGap: function getHGap() {
                        return 80;
                    }
                });
            }
        });

        G6.registerBehavior('click-add-edge', {
            getEvents() {
                return {
                    'node:click': 'onClick',
                };
            },
            onClick(ev) {
                const node = ev.item._cfg;
                let list =self.state.select_list;    
                    list.add(node)
                    onSelected(list)

              
            }

        });
        G6.Util.traverseTree(this.data, function (item) {
            item.id = item.name;
        });
      
        graph.addBehaviors("click-add-edge",'default')
        graph.data(this.data)
        graph.render()
        graph.fitView();
    }
    rednerG6 = () => {
        G6.registerNode('tree-node', {
            drawShape: function drawShape(cfg, group) {
                let rect = group.addShape('rect', {
                    attrs: {
                        fill: '#fff',
                        stroke: '#666'
                    }
                });
                let content = cfg.name.replace(/(.{19})/g, '$1\n');
                let text = group.addShape('text', {
                    attrs: {
                        text: content,
                        x: 0,
                        y: 0,
                        textAlign: 'left',
                        textBaseline: 'middle',
                        fill: '#666'
                    }
                });
                let bbox = text.getBBox();
                let hasChildren = cfg.children && cfg.children.length > 0;
                rect.attr({
                    x: bbox.minX - 4,
                    y: bbox.minY - 6,
                    width: bbox.width + (hasChildren ? 26 : 8),
                    height: bbox.height + 12
                });
                return rect;
            }
        }, 'single-shape');
    }
    render() {
        return (
            <div id="mountNode" ref="container"     >

            </div>
        );
    }
}

export default G6chart;