import React, { Component } from "react";
import * as d3 from "d3";
import "./D3Test2.scss";
// const data = require("./Dataset1");
// const data2 = require("./")
// import * as data2 from './Dataset2'

class D3Test2 extends Component {
  render() {
    var data = {
      name: "Sample",
      shortName: "Sample",
      children: [
        {
          name: "6.1 Identify and plan learning needs",
          shortName: "AITSL-A61",
          size: null,
          children: [
            {
              name: "Analyse the Standards for.",
              shortName: "AITSL-A61-H",
              size: 59,
              children: []
            },
            {
              name: "Demonstrate an  of the role of the",
              shortName: "AITSL-A61-G",
              size: 448,
              children: []
            },
            {
              name: "Use  knowledge of the Standards for ",
              shortName: "AITSL-A61-L",
              size: 59,
              children: []
            },
            {
              name: "Use the  plan learning needs.",
              shortName: "AITSL-A61-P",
              size: 101,
              children: []
            }
          ]
        },
        {
          name: "6.2 Engage in improve practice",
          shortName: "AITSL-A62",
          size: null,
          children: [
            {
              name: "Participate in to update knowledge .",
              shortName: "AITSL-A62-P",
              size: 92,
              children: []
            },
            {
              name: "Understand appropriate sources of .",
              shortName: "AITSL-A62-G",
              size: 405,
              children: []
            },
            {
              name: "Plan for  and critiquing ",
              shortName: "AITSL-A62-H",
              size: 49,
              children: []
            },
            {
              name: "Initiate to expand opportunities.",
              shortName: "AITSL-A62-L",
              size: 47,
              children: []
            }
          ]
        },
        {
          name: "6.3 Engage with  and improve practice",
          shortName: "AITSL-A63",
          size: null,
          children: [
            {
              name: "Contribute to collegial  and apply.",
              shortName: "AITSL-A63-P",
              size: 84,
              children: []
            },
            {
              name: "Initiate and engage in  discussions.",
              shortName: "AITSL-A63-H",
              size: 51,
              children: []
            },
            {
              name: "Seek and feedback from .",
              shortName: "AITSL-A63-G",
              size: 458,
              children: []
            },
            {
              name: "Implement  dialogue within   by .",
              shortName: "AITSL-A63-L",
              size: 40,
              children: []
            }
          ]
        },
        {
          name: "6.4 Apply  improve learning",
          shortName: "AITSL-A64",
          size: null,
          children: [
            {
              name: "Undertake  .",
              shortName: "AITSL-A64-P",
              size: 76,
              children: []
            },
            {
              name: "Demonstrate an  of the rationale.",
              shortName: "AITSL-A64-G",
              size: 426,
              children: []
            },
            {
              name: "Engage with  to evaluate the .",
              shortName: "AITSL-A64-H",
              size: 54,
              children: []
            },
            {
              name: "Advocate,  in and lead high-quality .",
              shortName: "AITSL-A64-L",
              size: 43,
              children: []
            }
          ]
        }
      ]
    };

    var data2 = {
      name: "flare",
      shortName: "flare",
      children: [
        {
          name: "analytics",
          shortName: "analytics",
          children: [
            {
              name: "cluster",
              shortName: "cluster",
              children: [
                {
                  name: "AgglomerativeCluster",
                  shortName: "AgglomerativeCluster",
                  size: 3938
                },
                {
                  name: "CommunityStructure",
                  shortName: "CommunityStructure",
                  size: 3812
                },
                {
                  name: "HierarchicalCluster",
                  shortName: "HierarchicalCluster",
                  size: 6714
                },
                {
                  name: "MergeEdge",
                  shortName: "MergeEdge",
                  size: 743
                }
              ]
            },
            {
              name: "graph",
              shortName: "graph",
              children: [
                {
                  name: "BetweennessCentrality",
                  shortName: "BetweennessCentrality",
                  size: 3534
                },
                {
                  name: "LinkDistance",
                  shortName: "LinkDistance",
                  size: 5731
                },
                {
                  name: "MaxFlowMinCut",
                  shortName: "MaxFlowMinCut",
                  size: 7840
                },
                {
                  name: "ShortestPaths",
                  shortName: "ShortestPaths",
                  size: 5914
                },
                {
                  name: "SpanningTree",
                  shortName: "SpanningTree",
                  size: 3416
                }
              ]
            },
            {
              name: "optimization",
              shortName: "optimization",
              children: [
                {
                  name: "AspectRatioBanker",
                  shortName: "AspectRatioBanker",
                  size: 7074
                }
              ]
            }
          ]
        },
        {
          name: "animate",
          shortName: "animate",
          children: [
            {
              name: "Easing",
              shortName: "Easing",
              size: 17010
            },
            {
              name: "FunctionSequence",
              shortName: "FunctionSequence",
              size: 5842
            },
            {
              name: "interpolate",
              shortName: "interpolate",
              children: [
                {
                  name: "ArrayInterpolator",
                  shortName: "ArrayInterpolator",
                  size: 1983
                },
                {
                  name: "ColorInterpolator",
                  shortName: "ColorInterpolator",
                  size: 2047
                },
                {
                  name: "DateInterpolator",
                  shortName: "DateInterpolator",
                  size: 1375
                },
                {
                  name: "Interpolator",
                  shortName: "Interpolator",
                  size: 8746
                },
                {
                  name: "MatrixInterpolator",
                  shortName: "MatrixInterpolator",
                  size: 2202
                },
                {
                  name: "NumberInterpolator",
                  shortName: "NumberInterpolator",
                  size: 1382
                },
                {
                  name: "ObjectInterpolator",
                  shortName: "ObjectInterpolator",
                  size: 1629
                },
                {
                  name: "PointInterpolator",
                  shortName: "PointInterpolator",
                  size: 1675
                },
                {
                  name: "RectangleInterpolator",
                  shortName: "RectangleInterpolator",
                  size: 2042
                }
              ]
            },
            {
              name: "ISchedulable",
              shortName: "ISchedulable",
              size: 1041
            },
            {
              name: "Parallel",
              shortName: "Parallel",
              size: 5176
            },
            {
              name: "Pause",
              shortName: "Pause",
              size: 449
            },
            {
              name: "Scheduler",
              shortName: "Scheduler",
              size: 5593
            },
            {
              name: "Sequence",
              shortName: "Sequence",
              size: 5534
            },
            {
              name: "Transition",
              shortName: "Transition",
              size: 9201
            },
            {
              name: "Transitioner",
              shortName: "Transitioner",
              size: 19975
            },
            {
              name: "TransitionEvent",
              shortName: "TransitionEvent",
              size: 1116
            },
            {
              name: "Tween",
              shortName: "Tween",
              size: 6006
            }
          ]
        },
        {
          name: "data",
          shortName: "data",
          children: [
            {
              name: "converters",
              shortName: "converters",
              children: [
                {
                  name: "Converters",
                  shortName: "Converters",
                  size: 721
                },
                {
                  name: "DelimitedTextConverter",
                  shortName: "DelimitedTextConverter",
                  size: 4294
                },
                {
                  name: "GraphMLConverter",
                  shortName: "GraphMLConverter",
                  size: 9800
                },
                {
                  name: "IDataConverter",
                  shortName: "IDataConverter",
                  size: 1314
                },
                {
                  name: "JSONConverter",
                  shortName: "JSONConverter",
                  size: 2220
                }
              ]
            },
            {
              name: "DataField",
              shortName: "DataField",
              size: 1759
            },
            {
              name: "DataSchema",
              shortName: "DataSchema",
              size: 2165
            },
            {
              name: "DataSet",
              shortName: "DataSet",
              size: 586
            },
            {
              name: "DataSource",
              shortName: "DataSource",
              size: 3331
            },
            {
              name: "DataTable",
              shortName: "DataTable",
              size: 772
            },
            {
              name: "DataUtil",
              shortName: "DataUtil",
              size: 3322
            }
          ]
        },
        {
          name: "display",
          shortName: "display",
          children: [
            {
              name: "DirtySprite",
              shortName: "DirtySprite",
              size: 8833
            },
            {
              name: "LineSprite",
              shortName: "LineSprite",
              size: 1732
            },
            {
              name: "RectSprite",
              shortName: "RectSprite",
              size: 3623
            },
            {
              name: "TextSprite",
              shortName: "TextSprite",
              size: 10066
            }
          ]
        },
        {
          name: "flex",
          shortName: "flex",
          children: [
            {
              name: "FlareVis",
              shortName: "FlareVis",
              size: 4116
            }
          ]
        },
        {
          name: "physics",
          shortName: "physics",
          children: [
            {
              name: "DragForce",
              shortName: "DragForce",
              size: 1082
            },
            {
              name: "GravityForce",
              shortName: "GravityForce",
              size: 1336
            },
            {
              name: "IForce",
              shortName: "IForce",
              size: 319
            },
            {
              name: "NBodyForce",
              shortName: "NBodyForce",
              size: 10498
            },
            {
              name: "Particle",
              shortName: "Particle",
              size: 2822
            },
            {
              name: "Simulation",
              shortName: "Simulation",
              size: 9983
            },
            {
              name: "Spring",
              shortName: "Spring",
              size: 2213
            },
            {
              name: "SpringForce",
              shortName: "SpringForce",
              size: 1681
            }
          ]
        },
        {
          name: "query",
          shortName: "query",
          children: [
            {
              name: "AggregateExpression",
              shortName: "AggregateExpression",
              size: 1616
            },
            {
              name: "And",
              shortName: "And",
              size: 1027
            },
            {
              name: "Arithmetic",
              shortName: "Arithmetic",
              size: 3891
            },
            {
              name: "Average",
              shortName: "Average",
              size: 891
            },
            {
              name: "BinaryExpression",
              shortName: "BinaryExpression",
              size: 2893
            },
            {
              name: "Comparison",
              shortName: "Comparison",
              size: 5103
            },
            {
              name: "CompositeExpression",
              shortName: "CompositeExpression",
              size: 3677
            },
            {
              name: "Count",
              shortName: "Count",
              size: 781
            },
            {
              name: "DateUtil",
              shortName: "DateUtil",
              size: 4141
            },
            {
              name: "Distinct",
              shortName: "Distinct",
              size: 933
            },
            {
              name: "Expression",
              shortName: "Expression",
              size: 5130
            },
            {
              name: "ExpressionIterator",
              shortName: "ExpressionIterator",
              size: 3617
            },
            {
              name: "Fn",
              shortName: "Fn",
              size: 3240
            },
            {
              name: "If",
              shortName: "If",
              size: 2732
            },
            {
              name: "IsA",
              shortName: "IsA",
              size: 2039
            },
            {
              name: "Literal",
              shortName: "Literal",
              size: 1214
            },
            {
              name: "Match",
              shortName: "Match",
              size: 3748
            },
            {
              name: "Maximum",
              shortName: "Maximum",
              size: 843
            },
            {
              name: "methods",
              shortName: "methods",
              children: [
                {
                  name: "add",
                  shortName: "add",
                  size: 593
                },
                {
                  name: "and",
                  shortName: "and",
                  size: 330
                },
                {
                  name: "average",
                  shortName: "average",
                  size: 287
                },
                {
                  name: "count",
                  shortName: "count",
                  size: 277
                },
                {
                  name: "distinct",
                  shortName: "distinct",
                  size: 292
                },
                {
                  name: "div",
                  shortName: "div",
                  size: 595
                },
                {
                  name: "eq",
                  shortName: "eq",
                  size: 594
                },
                {
                  name: "fn",
                  shortName: "fn",
                  size: 460
                },
                {
                  name: "gt",
                  shortName: "gt",
                  size: 603
                },
                {
                  name: "gte",
                  shortName: "gte",
                  size: 625
                },
                {
                  name: "iff",
                  shortName: "iff",
                  size: 748
                },
                {
                  name: "isa",
                  shortName: "isa",
                  size: 461
                },
                {
                  name: "lt",
                  shortName: "lt",
                  size: 597
                },
                {
                  name: "lte",
                  shortName: "lte",
                  size: 619
                },
                {
                  name: "max",
                  shortName: "max",
                  size: 283
                },
                {
                  name: "min",
                  shortName: "min",
                  size: 283
                },
                {
                  name: "mod",
                  shortName: "mod",
                  size: 591
                },
                {
                  name: "mul",
                  shortName: "mul",
                  size: 603
                },
                {
                  name: "neq",
                  shortName: "neq",
                  size: 599
                },
                {
                  name: "not",
                  shortName: "not",
                  size: 386
                },
                {
                  name: "or",
                  shortName: "or",
                  size: 323
                },
                {
                  name: "orderby",
                  shortName: "orderby",
                  size: 307
                },
                {
                  name: "range",
                  shortName: "range",
                  size: 772
                },
                {
                  name: "select",
                  shortName: "select",
                  size: 296
                },
                {
                  name: "stddev",
                  shortName: "stddev",
                  size: 363
                },
                {
                  name: "sub",
                  shortName: "sub",
                  size: 600
                },
                {
                  name: "sum",
                  shortName: "sum",
                  size: 280
                },
                {
                  name: "update",
                  shortName: "update",
                  size: 307
                },
                {
                  name: "variance",
                  shortName: "variance",
                  size: 335
                },
                {
                  name: "where",
                  shortName: "where",
                  size: 299
                },
                {
                  name: "xor",
                  shortName: "xor",
                  size: 354
                },
                {
                  name: "_",
                  size: 264
                }
              ]
            },
            {
              name: "Minimum",
              shortName: "Minimum",
              size: 843
            },
            {
              name: "Not",
              shortName: "Not",
              size: 1554
            },
            {
              name: "Or",
              shortName: "Or",
              size: 970
            },
            {
              name: "Query",
              shortName: "Query",
              size: 13896
            },
            {
              name: "Range",
              shortName: "Range",
              size: 1594
            },
            {
              name: "StringUtil",
              shortName: "StringUtil",
              size: 4130
            },
            {
              name: "Sum",
              shortName: "Sum",
              size: 791
            },
            {
              name: "Variable",
              shortName: "Variable",
              size: 1124
            },
            {
              name: "Variance",
              shortName: "Variance",
              size: 1876
            },
            {
              name: "Xor",
              shortName: "Xor",
              size: 1101
            }
          ]
        },
        {
          name: "scale",
          shortName: "scale",
          children: [
            {
              name: "IScaleMap",
              shortName: "IScaleMap",
              size: 2105
            },
            {
              name: "LinearScale",
              shortName: "LinearScale",
              size: 1316
            },
            {
              name: "LogScale",
              shortName: "LogScale",
              size: 3151
            },
            {
              name: "OrdinalScale",
              shortName: "OrdinalScale",
              size: 3770
            },
            {
              name: "QuantileScale",
              shortName: "QuantileScale",
              size: 2435
            },
            {
              name: "QuantitativeScale",
              shortName: "QuantitativeScale",
              size: 4839
            },
            {
              name: "RootScale",
              shortName: "RootScale",
              size: 1756
            },
            {
              name: "Scale",
              shortName: "Scale",
              size: 4268
            },
            {
              name: "ScaleType",
              shortName: "ScaleType",
              size: 1821
            },
            {
              name: "TimeScale",
              shortName: "TimeScale",
              size: 5833
            }
          ]
        },
        {
          name: "util",
          shortName: "util",
          children: [
            {
              name: "Arrays",
              shortName: "Arrays",
              size: 8258
            },
            {
              name: "Colors",
              shortName: "Colors",
              size: 10001
            },
            {
              name: "Dates",
              shortName: "Dates",
              size: 8217
            },
            {
              name: "Displays",
              shortName: "Displays",
              size: 12555
            },
            {
              name: "Filter",
              shortName: "Filter",
              size: 2324
            },
            {
              name: "Geometry",
              shortName: "Geometry",
              size: 10993
            },
            {
              name: "heap",
              shortName: "heap",
              children: [
                {
                  name: "FibonacciHeap",
                  shortName: "FibonacciHeap",
                  size: 9354
                },
                {
                  name: "HeapNode",
                  shortName: "HeapNode",
                  size: 1233
                }
              ]
            },
            {
              name: "IEvaluable",
              shortName: "IEvaluable",
              size: 335
            },
            {
              name: "IPredicate",
              shortName: "IPredicate",
              size: 383
            },
            {
              name: "IValueProxy",
              shortName: "IValueProxy",
              size: 874
            },
            {
              name: "math",
              shortName: "math",
              children: [
                {
                  name: "DenseMatrix",
                  shortName: "DenseMatrix",
                  size: 3165
                },
                {
                  name: "IMatrix",
                  shortName: "IMatrix",
                  size: 2815
                },
                {
                  name: "SparseMatrix",
                  shortName: "SparseMatrix",
                  size: 3366
                }
              ]
            },
            {
              name: "Maths",
              shortName: "Maths",
              size: 17705
            },
            {
              name: "Orientation",
              shortName: "Orientation",
              size: 1486
            },
            {
              name: "palette",
              shortName: "palette",
              children: [
                {
                  name: "ColorPalette",
                  shortName: "ColorPalette",
                  size: 6367
                },
                {
                  name: "Palette",
                  shortName: "Palette",
                  size: 1229
                },
                {
                  name: "ShapePalette",
                  shortName: "ShapePalette",
                  size: 2059
                },
                {
                  name: "SizePalette",
                  shortName: "SizePalette",
                  size: 2291
                }
              ]
            },
            {
              name: "Property",
              shortName: "Property",
              size: 5559
            },
            {
              name: "Shapes",
              shortName: "Shapes",
              size: 19118
            },
            {
              name: "Sort",
              shortName: "Sort",
              size: 6887
            },
            {
              name: "Stats",
              shortName: "Stats",
              size: 6557
            },
            {
              name: "Strings",
              shortName: "Strings",
              size: 22026
            }
          ]
        },
        {
          name: "vis",
          shortName: "vis",
          children: [
            {
              name: "axis",
              shortName: "axis",
              children: [
                {
                  name: "Axes",
                  shortName: "Axes",
                  size: 1302
                },
                {
                  name: "Axis",
                  shortName: "Axis",
                  size: 24593
                },
                {
                  name: "AxisGridLine",
                  shortName: "AxisGridLine",
                  size: 652
                },
                {
                  name: "AxisLabel",
                  shortName: "AxisLabel",
                  size: 636
                },
                {
                  name: "CartesianAxes",
                  shortName: "CartesianAxes",
                  size: 6703
                }
              ]
            },
            {
              name: "controls",
              shortName: "controls",
              children: [
                {
                  name: "AnchorControl",
                  shortName: "AnchorControl",
                  size: 2138
                },
                {
                  name: "ClickControl",
                  shortName: "ClickControl",
                  size: 3824
                },
                {
                  name: "Control",
                  shortName: "Control",
                  size: 1353
                },
                {
                  name: "ControlList",
                  shortName: "ControlList",
                  size: 4665
                },
                {
                  name: "DragControl",
                  shortName: "DragControl",
                  size: 2649
                },
                {
                  name: "ExpandControl",
                  shortName: "ExpandControl",
                  size: 2832
                },
                {
                  name: "HoverControl",
                  shortName: "HoverControl",
                  size: 4896
                },
                {
                  name: "IControl",
                  shortName: "IControl",
                  size: 763
                },
                {
                  name: "PanZoomControl",
                  shortName: "PanZoomControl",
                  size: 5222
                },
                {
                  name: "SelectionControl",
                  shortName: "SelectionControl",
                  size: 7862
                },
                {
                  name: "TooltipControl",
                  shortName: "TooltipControl",
                  size: 8435
                }
              ]
            },
            {
              name: "data",
              shortName: "data",
              children: [
                {
                  name: "Data",
                  shortName: "Data",
                  size: 20544
                },
                {
                  name: "DataList",
                  shortName: "DataList",
                  size: 19788
                },
                {
                  name: "DataSprite",
                  shortName: "DataSprite",
                  size: 10349
                },
                {
                  name: "EdgeSprite",
                  shortName: "EdgeSprite",
                  size: 3301
                },
                {
                  name: "NodeSprite",
                  shortName: "NodeSprite",
                  size: 19382
                },
                {
                  name: "render",
                  shortName: "render",
                  children: [
                    {
                      name: "ArrowType",
                      shortName: "ArrowType",
                      size: 698
                    },
                    {
                      name: "EdgeRenderer",
                      shortName: "EdgeRenderer",
                      size: 5569
                    },
                    {
                      name: "IRenderer",
                      shortName: "IRenderer",
                      size: 353
                    },
                    {
                      name: "ShapeRenderer",
                      shortName: "ShapeRenderer",
                      size: 2247
                    }
                  ]
                },
                {
                  name: "ScaleBinding",
                  shortName: "ScaleBinding",
                  size: 11275
                },
                {
                  name: "Tree",
                  shortName: "Tree",
                  size: 7147
                },
                {
                  name: "TreeBuilder",
                  shortName: "TreeBuilder",
                  size: 9930
                }
              ]
            },
            {
              name: "events",
              shortName: "events",
              children: [
                {
                  name: "DataEvent",
                  shortName: "DataEvent",
                  size: 2313
                },
                {
                  name: "SelectionEvent",
                  shortName: "SelectionEvent",
                  size: 1880
                },
                {
                  name: "TooltipEvent",
                  shortName: "TooltipEvent",
                  size: 1701
                },
                {
                  name: "VisualizationEvent",
                  shortName: "VisualizationEvent",
                  size: 1117
                }
              ]
            },
            {
              name: "legend",
              shortName: "legend",
              children: [
                {
                  name: "Legend",
                  shortName: "Legend",
                  size: 20859
                },
                {
                  name: "LegendItem",
                  shortName: "LegendItem",
                  size: 4614
                },
                {
                  name: "LegendRange",
                  shortName: "LegendRange",
                  size: 10530
                }
              ]
            },
            {
              name: "operator",
              shortName: "operator",
              children: [
                {
                  name: "distortion",
                  shortName: "distortion",
                  children: [
                    {
                      name: "BifocalDistortion",
                      shortName: "BifocalDistortion",
                      size: 4461
                    },
                    {
                      name: "Distortion",
                      shortName: "Distortion",
                      size: 6314
                    },
                    {
                      name: "FisheyeDistortion",
                      shortName: "FisheyeDistortion",
                      size: 3444
                    }
                  ]
                },
                {
                  name: "encoder",
                  shortName: "encoder",
                  children: [
                    {
                      name: "ColorEncoder",
                      shortName: "ColorEncoder",
                      size: 3179
                    },
                    {
                      name: "Encoder",
                      shortName: "Encoder",
                      size: 4060
                    },
                    {
                      name: "PropertyEncoder",
                      shortName: "PropertyEncoder",
                      size: 4138
                    },
                    {
                      name: "ShapeEncoder",
                      shortName: "ShapeEncoder",
                      size: 1690
                    },
                    {
                      name: "SizeEncoder",
                      shortName: "SizeEncoder",
                      size: 1830
                    }
                  ]
                },
                {
                  name: "filter",
                  shortName: "filter",
                  children: [
                    {
                      name: "FisheyeTreeFilter",
                      shortName: "FisheyeTreeFilter",
                      size: 5219
                    },
                    {
                      name: "GraphDistanceFilter",
                      shortName: "GraphDistanceFilter",
                      size: 3165
                    },
                    {
                      name: "VisibilityFilter",
                      shortName: "VisibilityFilter",
                      size: 3509
                    }
                  ]
                },
                {
                  name: "IOperator",
                  shortName: "IOperator",
                  size: 1286
                },
                {
                  name: "label",
                  shortName: "label",
                  children: [
                    {
                      name: "Labeler",
                      shortName: "Labeler",
                      size: 9956
                    },
                    {
                      name: "RadialLabeler",
                      shortName: "RadialLabeler",
                      size: 3899
                    },
                    {
                      name: "StackedAreaLabeler",
                      shortName: "StackedAreaLabeler",
                      size: 3202
                    }
                  ]
                },
                {
                  name: "layout",
                  shortName: "layout",
                  children: [
                    {
                      name: "AxisLayout",
                      shortName: "AxisLayout",
                      size: 6725
                    },
                    {
                      name: "BundledEdgeRouter",
                      shortName: "BundledEdgeRouter",
                      size: 3727
                    },
                    {
                      name: "CircleLayout",
                      shortName: "CircleLayout",
                      size: 9317
                    },
                    {
                      name: "CirclePackingLayout",
                      shortName: "CirclePackingLayout",
                      size: 12003
                    },
                    {
                      name: "DendrogramLayout",
                      shortName: "DendrogramLayout",
                      size: 4853
                    },
                    {
                      name: "ForceDirectedLayout",
                      shortName: "ForceDirectedLayout",
                      size: 8411
                    },
                    {
                      name: "IcicleTreeLayout",
                      shortName: "IcicleTreeLayout",
                      size: 4864
                    },
                    {
                      name: "IndentedTreeLayout",
                      shortName: "IndentedTreeLayout",
                      size: 3174
                    },
                    {
                      name: "Layout",
                      shortName: "Layout",
                      size: 7881
                    },
                    {
                      name: "NodeLinkTreeLayout",
                      shortName: "NodeLinkTreeLayout",
                      size: 12870
                    },
                    {
                      name: "PieLayout",
                      shortName: "PieLayout",
                      size: 2728
                    },
                    {
                      name: "RadialTreeLayout",
                      shortName: "RadialTreeLayout",
                      size: 12348
                    },
                    {
                      name: "RandomLayout",
                      shortName: "RandomLayout",
                      size: 870
                    },
                    {
                      name: "StackedAreaLayout",
                      shortName: "StackedAreaLayout",
                      size: 9121
                    },
                    {
                      name: "TreeMapLayout",
                      shortName: "TreeMapLayout",
                      size: 9191
                    }
                  ]
                },
                {
                  name: "Operator",
                  shortName: "Operator",
                  size: 2490
                },
                {
                  name: "OperatorList",
                  shortName: "OperatorList",
                  size: 5248
                },
                {
                  name: "OperatorSequence",
                  shortName: "OperatorSequence",
                  size: 4190
                },
                {
                  name: "OperatorSwitch",
                  shortName: "OperatorSwitch",
                  size: 2581
                },
                {
                  name: "SortOperator",
                  shortName: "SortOperator",
                  size: 2023
                }
              ]
            },
            {
              name: "Visualization",
              shortName: "Visualization",
              size: 16540
            }
          ]
        }
      ]
    };

    //https://bl.ocks.org/JacquesJahnichen/42afd0cde7cbf72ecb81
    //https://bl.ocks.org/ganeshv/6a8e9ada3ab7f2d88022
    //https://gist.github.com/tkafka/6d00c44d5ae52182f548a18e8db44811
    var margin = { top: 24, right: 0, bottom: 0, left: 0 }, // margen superior para pulsar y retroceder
      width = 1080, //640
      height = 530,
      formatNumber = d3.format(",d"),
      transitioning;

    var x = d3
      .scaleLinear()
      .domain([0, width])
      .range([0, width]);

    var y = d3
      .scaleLinear()
      .domain([0, height - margin.top - margin.bottom])
      .range([0, height - margin.top - margin.bottom]);

    var color = d3.scaleOrdinal().range(
      d3.schemeCategory10.map(function(c) {
        c = d3.rgb(c);
        c.opacity = 1;
        return c;
      })
    );
    //var color = d3.scaleOrdinal(d3.schemeCategory20.map(fader));

    var fader = function(color) {
      return d3.interpolateRgb(color, "#fff")(0.2);
    };
    var format = d3.format(",d");
    var treemap;
    var svg, grandparent;

    updateDrillDown();

    function updateDrillDown() {
      if (svg) {
        svg.selectAll("*").remove();
      } else {
        //		 var treemap = d3.layout.treemap()
        //	      .children(function(d, depth) { return depth ? null : d._children; })
        //	      .sort(function(a, b) { return a.value - b.value; })
        //	      .ratio(height / width * 0.5 * (1 + Math.sqrt(5)))
        //	      .round(false);

        svg = d3
          .select("#domainDrillDown")
          .append("svg")
          .attr("width", width - margin.left - margin.right)
          .attr("height", height - margin.bottom - margin.top)
          .style("margin-left", -margin.left + "px")
          .style("margin.right", -margin.right + "px")
          .append("g")
          .attr(
            "transform",
            "translate(" + margin.left + "," + margin.top + ")"
          )
          .style("shape-rendering", "crispEdges");

        grandparent = svg.append("g").attr("class", "grandparent");

        grandparent
          .append("rect")
          .attr("y", -margin.top)
          .attr("width", width)
          .attr("height", margin.top)
          // .attr("fill", 'none')
          ;

          grandparent.append("image")
          .attr("xlink:href", function (d) { return d.cover;})
          .attr("x", 2)
          .attr("width", 76)
          .attr("height", 120);
          // .on('dblclick', showInfo);

        grandparent
          .append("text")
          .attr("x", 6)
          .attr("y", 6 - margin.top)
          .attr("dy", ".75em");

        treemap = d3
          .treemap()
          .tile(
            d3.treemapResquarify.ratio(
              (height / width) * 0.5 * (1 + Math.sqrt(5))
            )
          )
          .size([width, height])
          .round(false)
          .paddingInner(1);
      }

      var root = d3
        .hierarchy(data2)
        .eachBefore(function(d) {
          d.id = (d.parent ? d.parent.id + "." : "") + d.data.shortName;
        })
        .sum(d => d.size)
        .sort(function(a, b) {
          console.log("initial root sort a " + a.value + " b " + b.value);
          return b.height - a.height || b.value - a.value;
        });

      initialize(root);
      accumulate(root);
      layout(root);
      treemap(root);
      display(root);
    }

    function initialize(root) {
      root.x = root.y = 0;
      root.x1 = width;
      root.y1 = height;
      root.depth = 0;
    }

    // Aggregate the values for internal nodes. This is normally done by the
    // treemap layout, but not here because of our custom implementation.
    // We also take a snapshot of the original children (_children) to avoid
    // the children being overwritten when when layout is computed.
    function accumulate(d) {
      console.log("accumulate called " + d.data.name);
      return (d._children = d.children)
        ? (d.value = d.children.reduce(function(p, v) {
            return p + accumulate(v);
          }, 0))
        : d.value;
    }

    // Compute the treemap layout recursively such that each group of siblings
    // uses the same size (1×1) rather than the dimensions of the parent cell.
    // This optimizes the layout for the current zoom state. Note that a wrapper
    // object is created for the parent node for each group of siblings so that
    // the parent’s dimensions are not discarded as we recurse. Since each group
    // of sibling was laid out in 1×1, we must rescale to fit using absolute
    // coordinates. This lets us use a viewport to zoom.
    function layout(d) {
      if (d._children) {
        //    treemap.nodes({_children: d._children});
        //	  treemap(d);
        d._children.forEach(function(c) {
          //c.x0 = d.x0 + c.x0 * (d.x1 - d.x0);
          //c.y0 = d.y0 + c.y0 * (d.y1 - d.y0);
          //c.x1 *= d.x1;
          //c.y1 *= d.y1;
          c.x0 = d.x0 + c.x0 * d.x1;
          c.y0 = d.y0 + c.y0 * d.y1;
          c.x1 *= d.x1 - d.x0;
          c.y1 *= d.y1 - d.y0;
          c.parent = d;
          layout(c);
        });
      }
    }

    function display(d) {
      grandparent
        .datum(d.parent)
        .on("click", transition)
        .select("text")
        .text(name(d));

      var g1 = svg
        .insert("g", ".grandparent")
        .datum(d)
        .attr("class", "depth");

      var g = g1
        .selectAll("g")
        .data(d._children)
        .enter()
        .append("g");

      g.filter(function(d) {
        return d._children;
      })
        .classed("children", true)
        .on("click", transition);

      var children = g
        .selectAll(".child")
        .data(function(d) {
          return d._children || [d];
        })
        .enter()
        .append("g");

      children
        .append("rect")
        .attr("class", "child")
        .call(rect)
        .append("title")
        .text(function(d) {
          return d.data.shortName + " (" + formatNumber(d.value) + ")";
        });

      children
        .append("text")
        .attr("class", "ctext")
        .text(function(d) {
          return d.data.shortName;
        })
        .call(text2);

      g.append("rect")
        .attr("class", "parent")
        .call(rect);

      var t = g
        .append("text")
        .attr("class", "ptext")
        .attr("dy", ".75em");

      t.append("tspan").text(function(d) {
        return d.data.shortName;
      });

      t.append("tspan")
        .attr("dy", "1.0em")
        .text(function(d) {
          return formatNumber(d.value);
        });

      t.call(text);

      g.selectAll("rect").style("fill", function(d) {
        return color(d.data.shortName);
      });

      function transition(d) {
        if (transitioning || !d) return;
        transitioning = true;
        var g2 = display(d),
          t1 = g1.transition().duration(750),
          t2 = g2.transition().duration(750);

        // Update the domain only after entering new elements.
        //x.domain([d.x0, d.x0 + d.x1]);
        //y.domain([d.y0, d.y0 + d.y1]);
        x.domain([d.x0, d.x0 + (d.x1 - d.x0)]);
        y.domain([d.y0, d.y0 + (d.y1 - d.y0)]);

        // Enable anti-aliasing during the transition.
        svg.style("shape-rendering", null);

        // Draw child nodes on top of parent nodes.
        svg.selectAll(".depth").sort(function(a, b) {
          console.log(".depth sort a " + a.depth + " b " + b.depth);
          return a.depth - b.depth;
        });

        // Fade-in entering text.
        g2.selectAll("text").style("fill-opacity", 0);

        // Transition to the new view.
        t1.selectAll(".ptext")
          .call(text)
          .style("fill-opacity", 0);
        t2.selectAll(".ptext")
          .call(text)
          .style("fill-opacity", 1);
        t1.selectAll(".ctext")
          .call(text2)
          .style("fill-opacity", 0);
        t2.selectAll(".ctext")
          .call(text2)
          .style("fill-opacity", 1);
        t1.selectAll("rect").call(rect);
        t2.selectAll("rect").call(rect);

        // Remove the old node when the transition is finished.
        t1.remove().on("end", function() {
          svg.style("shape-rendering", "crispEdges");
          transitioning = false;
        });
      }
      return g;
    }

    function text(text) {
      text.selectAll("tspan").attr("x", function(d) {
        return x(d.x0) + 6;
      });
      text
        .attr("x", function(d) {
          return x(d.x0) + 6;
        })
        .attr("y", function(d) {
          return y(d.y0) + 3;
        })
        .style("opacity", function(d) {
          var w = x(d.x1) - x(d.x0);
          console.log(
            "text opacity setting textlength " +
              this.getComputedTextLength() +
              " d size " +
              w
          );
          return this.getComputedTextLength() < w - 6 ? 1 : 0;
        });
    }

    function text2(text) {
      text
        .attr("x", function(d) {
          return x(d.x1) - this.getComputedTextLength() - 6;
        })
        .attr("y", function(d) {
          return y(d.y1) - 6;
        })
        .style("opacity", function(d) {
          var w = x(d.x1) - x(d.x0);
          console.log(
            "text2 opacity setting textlength " +
              this.getComputedTextLength() +
              " d size " +
              w
          );
          return this.getComputedTextLength() < w - 6 ? 1 : 0;
        });
    }

    function rect(rect) {
      rect
        .attr("x", function(d) {
          return x(d.x0);
        })
        .attr("y", function(d) {
          return y(d.y0);
        })
        .attr("width", function(d) {
          var w = x(d.x1) - x(d.x0);
          console.log("id " + d.id + " rect width " + w);
          return w;
        })
        .attr("height", function(d) {
          var h = y(d.y1) - y(d.y0);
          console.log("id " + d.id + " rect height " + h);
          return h;
        });
    }

    function name(d) {
      return d.parent
        ? name(d.parent) +
            " / " +
            d.data.shortName +
            " (" +
            formatNumber(d.value) +
            ")"
        : d.data.shortName + " (" + formatNumber(d.value) + ")";
    }

    return <div id="domainDrillDown"></div>;
  }
}
export default D3Test2;
