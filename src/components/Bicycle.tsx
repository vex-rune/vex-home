import React from 'react';

// ============================================
// 🚲 自行车坐标配置（方便调试调整）
// ============================================

// 整体配置
const BIKE_CONFIG = {
  // 轮胎半径
  WHEEL_RADIUS: 35,
  // 轮胎粗细
  WHEEL_STROKE: 3.5,
  // 辐条粗细
  SPOKE_STROKE: 1,
  // 车架粗细
  FRAME_STROKE: 2.5,
  // 旋转动画时长（秒）- 越大越慢
  SPIN_DURATION: '2.5s',
};

// ============================================
// 📍 关键点坐标（重合的点只定义一次）
// ============================================

// 后轮圆心 = 飞轮圆心（驱动轮轴心）
const REAR_WHEEL = { x: 45, y: 85 };

// 前轮圆心（转向轮轴心）
const FRONT_WHEEL = { x: 155, y: 85 };

// 中轴 = 牙盘圆心（车架底部中心，踩踏力输入点）
const BOTTOM_BRACKET = { x: 100, y: 85 };

// 头管位置（连接车架与前叉的转向点）
const HEAD_TUBE = { x: 140, y: 38 };

// 座管顶部 = 座杆底部（座垫下方连接点）
const SEAT_TUBE_TOP = { x: 75, y: 38 };

// 座垫中心
const SADDLE_CENTER = { x: 75, y: 20 };

// 车把中心
const HANDLEBAR_CENTER = { x: 140, y: 20 };

// ============================================
// 🔧 各系统参数
// ============================================

// 传动系统
const DRIVETRAIN = {
  // 牙盘半径
  chainringRadius: 10,
  // 飞轮半径
  cogRadius: 4,
  // 曲柄长度
  crankLength: 15,
  // 脚踏尺寸
  pedalWidth: 10,
  pedalHeight: 4,
};

// 车把系统
const HANDLEBAR = {
  // 把立长度
  stemLength: 20,
  // 车把宽度
  width: 10,
  // 把套尺寸
  gripSize: 6,
};

// 座垫系统
const SADDLE = {
  // 座杆高度（从座管顶部到座垫底部）
  postHeight: 6,
  // 座垫宽度（椭圆长轴）
  width: 10,
  // 座垫高度（椭圆短轴）
  height: 2,
};

const Bicycle: React.FC = () => {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* ===== 1. 车轮系统 ===== */}

      {/* 后轮 */}
      <circle
        cx={REAR_WHEEL.x}
        cy={REAR_WHEEL.y}
        r={BIKE_CONFIG.WHEEL_RADIUS}
        stroke="#2a2a2a"
        strokeWidth={BIKE_CONFIG.WHEEL_STROKE}
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`0 ${REAR_WHEEL.x} ${REAR_WHEEL.y}`}
          to={`360 ${REAR_WHEEL.x} ${REAR_WHEEL.y}`}
          dur={BIKE_CONFIG.SPIN_DURATION}
          repeatCount="indefinite"
        />
      </circle>

      {/* 后轮辐条 */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`0 ${REAR_WHEEL.x} ${REAR_WHEEL.y}`}
          to={`360 ${REAR_WHEEL.x} ${REAR_WHEEL.y}`}
          dur={BIKE_CONFIG.SPIN_DURATION}
          repeatCount="indefinite"
        />
        <line
          x1={REAR_WHEEL.x} y1={REAR_WHEEL.y - BIKE_CONFIG.WHEEL_RADIUS}
          x2={REAR_WHEEL.x} y2={REAR_WHEEL.y + BIKE_CONFIG.WHEEL_RADIUS}
          stroke="#2a2a2a" strokeWidth={BIKE_CONFIG.SPOKE_STROKE}
        />
        <line
          x1={REAR_WHEEL.x - BIKE_CONFIG.WHEEL_RADIUS} y1={REAR_WHEEL.y}
          x2={REAR_WHEEL.x + BIKE_CONFIG.WHEEL_RADIUS} y2={REAR_WHEEL.y}
          stroke="#2a2a2a" strokeWidth={BIKE_CONFIG.SPOKE_STROKE}
        />
        <line
          x1={REAR_WHEEL.x - 18} y1={REAR_WHEEL.y - 18}
          x2={REAR_WHEEL.x + 18} y2={REAR_WHEEL.y + 18}
          stroke="#2a2a2a" strokeWidth={BIKE_CONFIG.SPOKE_STROKE}
        />
        <line
          x1={REAR_WHEEL.x + 18} y1={REAR_WHEEL.y - 18}
          x2={REAR_WHEEL.x - 18} y2={REAR_WHEEL.y + 18}
          stroke="#2a2a2a" strokeWidth={BIKE_CONFIG.SPOKE_STROKE}
        />
      </g>

      {/* 前轮 */}
      <circle
        cx={FRONT_WHEEL.x}
        cy={FRONT_WHEEL.y}
        r={BIKE_CONFIG.WHEEL_RADIUS}
        stroke="#2a2a2a"
        strokeWidth={BIKE_CONFIG.WHEEL_STROKE}
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`0 ${FRONT_WHEEL.x} ${FRONT_WHEEL.y}`}
          to={`360 ${FRONT_WHEEL.x} ${FRONT_WHEEL.y}`}
          dur={BIKE_CONFIG.SPIN_DURATION}
          repeatCount="indefinite"
        />
      </circle>

      {/* 前轮辐条 */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`0 ${FRONT_WHEEL.x} ${FRONT_WHEEL.y}`}
          to={`360 ${FRONT_WHEEL.x} ${FRONT_WHEEL.y}`}
          dur={BIKE_CONFIG.SPIN_DURATION}
          repeatCount="indefinite"
        />
        <line
          x1={FRONT_WHEEL.x} y1={FRONT_WHEEL.y - BIKE_CONFIG.WHEEL_RADIUS}
          x2={FRONT_WHEEL.x} y2={FRONT_WHEEL.y + BIKE_CONFIG.WHEEL_RADIUS}
          stroke="#2a2a2a" strokeWidth={BIKE_CONFIG.SPOKE_STROKE}
        />
        <line
          x1={FRONT_WHEEL.x - BIKE_CONFIG.WHEEL_RADIUS} y1={FRONT_WHEEL.y}
          x2={FRONT_WHEEL.x + BIKE_CONFIG.WHEEL_RADIUS} y2={FRONT_WHEEL.y}
          stroke="#2a2a2a" strokeWidth={BIKE_CONFIG.SPOKE_STROKE}
        />
        <line
          x1={FRONT_WHEEL.x - 18} y1={FRONT_WHEEL.y - 18}
          x2={FRONT_WHEEL.x + 18} y2={FRONT_WHEEL.y + 18}
          stroke="#2a2a2a" strokeWidth={BIKE_CONFIG.SPOKE_STROKE}
        />
        <line
          x1={FRONT_WHEEL.x + 18} y1={FRONT_WHEEL.y - 18}
          x2={FRONT_WHEEL.x - 18} y2={FRONT_WHEEL.y + 18}
          stroke="#2a2a2a" strokeWidth={BIKE_CONFIG.SPOKE_STROKE}
        />
      </g>

      {/* ===== 2. 车架系统（三角形） ===== */}

      {/* 后下叉：中轴 → 后轮轴 */}
      <line
        x1={BOTTOM_BRACKET.x} y1={BOTTOM_BRACKET.y}
        x2={REAR_WHEEL.x} y2={REAR_WHEEL.y}
        stroke="#2a2a2a" strokeWidth={BIKE_CONFIG.FRAME_STROKE}
      />

      {/* 下管：中轴 → 头管 */}
      <line
        x1={BOTTOM_BRACKET.x} y1={BOTTOM_BRACKET.y}
        x2={HEAD_TUBE.x} y2={HEAD_TUBE.y}
        stroke="#2a2a2a" strokeWidth={BIKE_CONFIG.FRAME_STROKE}
      />

      {/* 上管：座管顶 → 头管 */}
      <line
        x1={SEAT_TUBE_TOP.x} y1={SEAT_TUBE_TOP.y}
        x2={HEAD_TUBE.x} y2={HEAD_TUBE.y}
        stroke="#2a2a2a" strokeWidth={BIKE_CONFIG.FRAME_STROKE}
      />

      {/* 座管：中轴 → 座管顶 */}
      <line
        x1={BOTTOM_BRACKET.x} y1={BOTTOM_BRACKET.y}
        x2={SEAT_TUBE_TOP.x} y2={SEAT_TUBE_TOP.y}
        stroke="#2a2a2a" strokeWidth={BIKE_CONFIG.FRAME_STROKE}
      />

      {/* 后上叉：座管顶 → 后轮轴 */}
      <line
        x1={SEAT_TUBE_TOP.x} y1={SEAT_TUBE_TOP.y}
        x2={REAR_WHEEL.x} y2={REAR_WHEEL.y}
        stroke="#2a2a2a" strokeWidth={BIKE_CONFIG.FRAME_STROKE}
      />

      {/* 头管 */}
      <line
        x1={HEAD_TUBE.x} y1={HEAD_TUBE.y - 5}
        x2={HEAD_TUBE.x} y2={HEAD_TUBE.y + 5}
        stroke="#2a2a2a" strokeWidth="3"
      />

      {/* ===== 3. 前叉系统 ===== */}

      {/* 前叉：头管 → 前轮轴 */}
      <line
        x1={HEAD_TUBE.x} y1={HEAD_TUBE.y}
        x2={FRONT_WHEEL.x} y2={FRONT_WHEEL.y}
        stroke="#2a2a2a" strokeWidth={BIKE_CONFIG.FRAME_STROKE}
      />

      {/* ===== 4. 传动系统 ===== */}

      {/* 牙盘（圆心 = 中轴） */}
      <circle
        cx={BOTTOM_BRACKET.x}
        cy={BOTTOM_BRACKET.y}
        r={DRIVETRAIN.chainringRadius}
        stroke="#2a2a2a" strokeWidth="2" fill="none"
      />

      {/* 飞轮（圆心 = 后轮轴） */}
      <circle
        cx={REAR_WHEEL.x}
        cy={REAR_WHEEL.y}
        r={DRIVETRAIN.cogRadius}
        stroke="#2a2a2a" strokeWidth="1.5" fill="none"
      />

      {/* 链条 */}
      <path
        d={`M ${BOTTOM_BRACKET.x} ${BOTTOM_BRACKET.y + DRIVETRAIN.chainringRadius}
            L ${REAR_WHEEL.x} ${REAR_WHEEL.y + DRIVETRAIN.cogRadius}`}
        stroke="#2a2a2a" strokeWidth="1" strokeDasharray="2,2"
      />
      <path
        d={`M ${BOTTOM_BRACKET.x} ${BOTTOM_BRACKET.y - DRIVETRAIN.chainringRadius}
            L ${REAR_WHEEL.x} ${REAR_WHEEL.y - DRIVETRAIN.cogRadius}`}
        stroke="#2a2a2a" strokeWidth="1" strokeDasharray="2,2"
      />

      {/* 曲柄和脚踏 */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`0 ${BOTTOM_BRACKET.x} ${BOTTOM_BRACKET.y}`}
          to={`360 ${BOTTOM_BRACKET.x} ${BOTTOM_BRACKET.y}`}
          dur={BIKE_CONFIG.SPIN_DURATION}
          repeatCount="indefinite"
        />
        {/* 曲柄 */}
        <line
          x1={BOTTOM_BRACKET.x} y1={BOTTOM_BRACKET.y}
          x2={BOTTOM_BRACKET.x} y2={BOTTOM_BRACKET.y - DRIVETRAIN.crankLength}
          stroke="#2a2a2a" strokeWidth={BIKE_CONFIG.FRAME_STROKE}
        />
        {/* 脚踏 */}
        <rect
          x={BOTTOM_BRACKET.x - DRIVETRAIN.pedalWidth / 2}
          y={BOTTOM_BRACKET.y - DRIVETRAIN.crankLength - DRIVETRAIN.pedalHeight / 2}
          width={DRIVETRAIN.pedalWidth}
          height={DRIVETRAIN.pedalHeight}
          fill="#2a2a2a" rx="1"
        />
      </g>

      {/* ===== 5. 操控系统 ===== */}

      {/* 把立 */}
      <line
        x1={HANDLEBAR_CENTER.x} y1={HANDLEBAR_CENTER.y}
        x2={HANDLEBAR_CENTER.x} y2={HANDLEBAR_CENTER.y + HANDLEBAR.stemLength}
        stroke="#2a2a2a" strokeWidth="2"
      />

      {/* 车把 */}
      <line
        x1={HANDLEBAR_CENTER.x - HANDLEBAR.width / 2} y1={HANDLEBAR_CENTER.y}
        x2={HANDLEBAR_CENTER.x + HANDLEBAR.width / 2} y2={HANDLEBAR_CENTER.y}
        stroke="#2a2a2a" strokeWidth={BIKE_CONFIG.FRAME_STROKE}
      />

      {/* 把套 */}
      <rect
        x={HANDLEBAR_CENTER.x - HANDLEBAR.width / 2 - HANDLEBAR.gripSize}
        y={HANDLEBAR_CENTER.y - HANDLEBAR.gripSize / 2}
        width={HANDLEBAR.gripSize}
        height={HANDLEBAR.gripSize}
        fill="#2a2a2a" rx="2"
      />
      <rect
        x={HANDLEBAR_CENTER.x + HANDLEBAR.width / 2}
        y={HANDLEBAR_CENTER.y - HANDLEBAR.gripSize / 2}
        width={HANDLEBAR.gripSize}
        height={HANDLEBAR.gripSize}
        fill="#2a2a2a" rx="2"
      />

      {/* ===== 6. 座垫系统 ===== */}

      {/* 座杆 */}
      <line
        x1={SADDLE_CENTER.x} y1={SEAT_TUBE_TOP.y}
        x2={SADDLE_CENTER.x} y2={SADDLE_CENTER.y + SADDLE.height}
        stroke="#2a2a2a" strokeWidth="2"
      />

      {/* 座垫 */}
      <ellipse
        cx={SADDLE_CENTER.x}
        cy={SADDLE_CENTER.y}
        rx={SADDLE.width}
        ry={SADDLE.height}
        fill="#2a2a2a"
      />
    </svg>
  );
};

export default Bicycle;