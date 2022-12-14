## 恒定力

恒定力可用于款苏向刚体添加恒定力。如果不希望某些一次性对象以较大的速度开始而是主键加速，很适合使用恒定力。

### 属性

| 属性：          | 功能：                                                       |
| --------------- | ------------------------------------------------------------ |
| Force           | 要在世界空间中应用的力的矢量。                               |
| Relative Force  | 要在对象局部空间中应用的的力的矢量。                         |
| Torque          | 在世界空间中应用的扭矩的矢量。对象将开始围绕此矢量旋转，矢量越长，旋转越快。 |
| Relative Torque | 在局部空间中应用的扭矩的矢量。对象将开始围绕此矢量旋转，矢量越长，旋转越快。 |

要制作一个向前加速的火箭，将Relative Force 设定在沿正Z轴。然后使用刚体的Drag属性使其不超过最大速度（阻力越高，最大速度越低）。在刚体中还要确保关闭重力，以便火箭始终保持在其路径上。

* 要使对象向上飞，添加具有正Y值Force属性得恒定力。
* 要是对象向前飞，添加具有正Z值Relative Force 属性得恒定力。

