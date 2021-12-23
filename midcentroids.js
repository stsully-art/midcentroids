class Random {
  constructor(seed) {
    this.seed = seed
  }
  random_dec() {
    /* Algorithm "xor" from p. 4 of Marsaglia, "Xorshift RNGs" */
    this.seed ^= this.seed << 13
    this.seed ^= this.seed >> 17
    this.seed ^= this.seed << 5
    return ((this.seed < 0 ? ~this.seed + 1 : this.seed) % 1000) / 1000
  }
  random_num(a, b) {
    return a+(b-a)*this.random_dec()
  }
  random_int(a, b) {
    return Math.floor(this.random_num(a, b+1))
  }
  random_bool(p) {
    return this.random_dec() < p
  }
  random_choice(list) {
    return list[Math.floor(this.random_num(0, list.length * 0.99))]
  }
  random() {
    return this.random_num(0.0, 1.0)
  }
}

function random_hash() {
  let x = "0123456789abcdef", hash = '0x'
  for (let i = 64; i > 0; --i) {
    hash += x[Math.floor(Math.random()*x.length)]
  }
  // hash = "0x54f76f28649acac0e892f962789a42927972d9fde3786aa0fd400163762cc8b0"
  console.log("Hash:", hash)
  return hash
}

tokenData = {
  "hash": random_hash(),
  "tokenId": "123000456"
}

let seed = parseInt(tokenData.hash.slice(0, 16), 16)

let R = new Random(seed)

var WIDTH = window.innerWidth
var HEIGHT = window.innerHeight
var DIM = Math.min(WIDTH, HEIGHT)
WIDTH = DIM * 0.75
HEIGHT = DIM
var M = DIM / 1000

function weighted_random(items, weights) {
    var i;

    for (i = 0; i < weights.length; i++)
        weights[i] += weights[i - 1] || 0;
    
    var random = R.random() * weights[weights.length - 1];
    
    for (i = 0; i < weights.length; i++)
        if (weights[i] > random)
            break;
    
    return items[i];
}

TINY_STROKES = 1
MEDIUM_STROKES = 2
LARGE_STROKES = 3
VERY_LARGE_STROKES = 4
MASSIVE_STROKES = 5
STROKE_TYPES = [TINY_STROKES, MEDIUM_STROKES, LARGE_STROKES,
               VERY_LARGE_STROKES, MASSIVE_STROKES]
STROKE_PROBS = [10, 30, 30, 20, 10]

FEW_STROKES = 1
SOME_STROKES = 2
AVERAGE_STROKES = 3
MANY_STROKES = 4
ABUNDANT_STROKES = 5
ONE_STROKE = 6
STROKE_COUNTS = [ONE_STROKE, FEW_STROKES, SOME_STROKES, AVERAGE_STROKES,
                MANY_STROKES, ABUNDANT_STROKES]
COUNT_PROBS = [1, 20, 30, 39, 8, 2]
// COUNT_PROBS = [100, 0, 0, 0, 0, 0]

NORMAL_STROKES = 1
CONVOLUTED_STROKES = 2
VERY_CONVOLUTED_STROKES = 3
STROKE_COMPLEXITIES = [NORMAL_STROKES, CONVOLUTED_STROKES, 
                       VERY_CONVOLUTED_STROKES]
COMPLEXITY_PROBS = [50, 40, 10]

CLOSURE_NONE = 1
CLOSURE_STAR = 2
CLOSURE_WALKBACK = 3
CLOSURE_WANDERBACK = 4
CLOSURES = [CLOSURE_NONE, CLOSURE_WANDERBACK, CLOSURE_STAR, 
            CLOSURE_WALKBACK]
CLOSURE_PROBS = [30, 50, 10, 10]
// CLOSURE_PROBS = [0, 0, 100, 0]

var props = {}

straight_lines = R.random_bool(0.5)
props["Straight Lines"] = straight_lines
console.log("Straight lines:", straight_lines)
grid_pattern = R.random_bool(0.2)
props["Grid Pattern"] = grid_pattern
console.log("Grid pattern:", grid_pattern)
outline = R.random_bool(0.5)
props["Outlined"] = outline
console.log("Outline:", outline)
hot_outline = R.random_bool(0.5)
props["Hot Outline"] = hot_outline
console.log("Hot outline:", hot_outline)
sign = 1

closure_mode = weighted_random(CLOSURES, CLOSURE_PROBS)
if (closure_mode == CLOSURE_NONE) {
  props["Closure Mode"] = "None"
  console.log("Closure mode: none")
}
if (closure_mode == CLOSURE_WANDERBACK) {
  props["Closure Mode"] = "Wander Back"
  console.log("Closure mode: wander back")
  sign = -1
}
if (closure_mode == CLOSURE_WALKBACK) {
  props["Closure Mode"] = "Walk Back"
  console.log("Closure mode: walk back")
  if (outline) {
    outline = false
    props["Outlined"] = outline
    console.log("Overriding outline:", outline)
  }
}
if (closure_mode == CLOSURE_STAR) {
  props["Closure Mode"] = "Star"
  console.log("Closure mode: star")
}

stroke_size_mode = weighted_random(STROKE_TYPES, STROKE_PROBS)
if (stroke_size_mode == TINY_STROKES) {
  curve_max_size = R.random_int(2,5)
  props["Emblem  Size"] = "Tiny"
  console.log("Emblem  size mode: tiny strokes", curve_max_size)
  // COUNT_PROBS = [1, 5, 9, 25, 25, 35]
}
if (stroke_size_mode == MEDIUM_STROKES) {
  curve_max_size = R.random_int(8,12)
  props["Emblem  Size"] = "Medium"
  console.log("Emblem  size mode: medium strokes", curve_max_size)
  // COUNT_PROBS = [1, 9, 15, 30, 25, 15]
}
if (stroke_size_mode == LARGE_STROKES) {
  curve_max_size = R.random_int(18,26)
  props["Emblem  Size"] = "Large"
  console.log("Emblem  size mode: large strokes", curve_max_size)
  // COUNT_PROBS = [3, 15, 22, 30, 20, 10]
}
if (stroke_size_mode == VERY_LARGE_STROKES) {
  curve_max_size = R.random_int(30,42)
  props["Emblem  Size"] = "Very Large"
  console.log("Emblem  size mode: very large strokes", curve_max_size)
}
if (stroke_size_mode == MASSIVE_STROKES) {
  curve_max_size = R.random_int(50,100)
  props["Emblem  Size"] = "Massive"
  console.log("Emblem  size mode: massive strokes", curve_max_size)
}

stroke_count_mode = weighted_random(STROKE_COUNTS, COUNT_PROBS)
if (stroke_count_mode == FEW_STROKES) {
  strokes = R.random_int(5, 10)
  props["Emblem  Count"] = "Few"
  console.log("Emblem  count mode: few strokes", strokes)
}
if (stroke_count_mode == SOME_STROKES) {
  strokes = R.random_int(15, 30)
  props["Emblem  Count"] = "Some"
  console.log("Emblem  count mode: some strokes", strokes)
}
if (stroke_count_mode == AVERAGE_STROKES) {
  strokes = R.random_int(40, 60)
  props["Emblem  Count"] = "Average"
  console.log("Emblem  count mode: average strokes", strokes)
}
if (stroke_count_mode == MANY_STROKES) {
  strokes = R.random_int(80, 100)
  props["Emblem  Count"] = "Many"
  console.log("Emblem  count mode: many strokes", strokes)
}
if (stroke_count_mode == ABUNDANT_STROKES) {
  strokes = R.random_int(150, 200)
  props["Emblem  Count"] = "Abundant"
  console.log("Emblem  count mode: abundant strokes", strokes)
}
if (stroke_count_mode == ONE_STROKE) {
  strokes = 1
  props["Emblem  Count"] = "One"
  console.log("Emblem  count mode: one stroke", strokes)
  props["Emblem  Size"] = "Massive"
  curve_max_size = R.random_int(100,200)
  console.log("Overriding size mode: massive strokes", curve_max_size)
  grid_pattern = false
  props["Grid Pattern"] = grid_pattern
  console.log("Overriding grid pattern:", grid_pattern)
}

complexity_mode = weighted_random(STROKE_COMPLEXITIES, COMPLEXITY_PROBS)
if (complexity_mode == NORMAL_STROKES) {
  curves_per_stroke = R.random_int(5, 25)
  step_scalar = 10
  props["Emblem  Complexity"] = "Normal"
  console.log("Convoluted strokes: normal complexity", 
              curves_per_stroke)
}
if (complexity_mode == CONVOLUTED_STROKES) {
  curves_per_stroke = R.random_int(50, 300)
  step_scalar = 1.2
  props["Emblem  Complexity"] = "Convoluted"
  console.log("Convoluted strokes: convoluted complexity", 
              curves_per_stroke)
}
if (complexity_mode == VERY_CONVOLUTED_STROKES) {
  curves_per_stroke = R.random_int(500, 1000)
  step_scalar = 0.8
  props["Emblem  Complexity"] = "Very Convoluted"
  console.log("Convoluted strokes: very convoluted complexity", 
              curves_per_stroke)
}

bw = {"bg" : [0, 0, 0],
      "sc" : [[255, 255, 255],
              [210,210,210],
              [170,170,170],
              [120,120,120],
              [249,56,34]]}
wb = {"bg" : [255, 255, 255],
      "sc" : [[0,0,0],
              [50,50,50],
              [90,90,90],
              [140,140,140],
              [185,75,219]
             ]}
reds = {"bg" : [40, 0, 0],
        "sc" : [[130,0,0],
                [180,0,0],
                [220,0,0],
                [255,0,0],
                [0,180,180],
               ]}
greens = {"bg" : [0, 40, 0],
          "sc" : [[0,130,0],
                  [0,180,0],
                  [0,220,0],
                  [0,255,0],
                  [180,0,180]
                  ]}
blues = {"bg" : [0, 0, 40],
         "sc" : [[0,0,130],
                 [0,0,180],
                 [0,0,220],
                 [0,0,255],
                 [180,180,0]
                ]}
primaries = {"bg" : [250, 250, 250],
            "sc"  : [[255, 0, 0],
                     [0,200,0],
                     [0,0,255],
                     [240,240,0],
                     [240,0,240]
                     ]}
darkula  = {"bg" : [20, 0, 20],
            "sc"  : [[80, 0, 0],
                     [0,80,0],
                     [20,20,80],
                     [80,80,0],
                     [80,0,80]
                     ]}
coral = {"bg" : [16,24,32],
          "sc" : [[252,118,106],
                  [91,132,177],
                  [244,223,78],
                  [43,174,102],
                  [250,208,201]]}
burnt = {"bg" : [45,41,38],
         "sc" : [[233,75,60],
                 [160,120,85],
                 [242,140,46],
                 [254,231,21],
                 [183,110,121]]}
spring = {"bg" : [151,188,98],
          "sc" : [[44,95,45],
                  [173,239,209],
                  [253,210,14],
                  [249,87,0],
                  [243,61,157]]}
tropical = {"bg" : [0,107,56],
          "sc" : [[66,234,221],
                  [0,177,210],
                  [121,192,0],
                  [253,219,39],
                  [206,74,126]]}

colors = [darkula, bw, wb, reds, greens, blues, primaries, spring, burnt, coral,tropical]
color_probs = [10, 10, 10, 15, 15, 15, 10, 5, 5, 4, 1]
color_choice = weighted_random(colors, color_probs)
if (color_choice == darkula) {
  props["Palette"] = "Darkula"
  console.log("Color palatte: darkula")
}
if (color_choice == bw) {
  props["Palette"] = "White on Black"
  console.log("Color palatte: white on black")
}
if (color_choice == wb) {
  props["Palette"] = "Black on White"
  console.log("Color palatte: black on white")
}
if (color_choice == reds) {
  props["Palette"] = "Reds"
  console.log("Color palatte: reds")
}
if (color_choice == blues) {
  props["Palette"] = "Blues"
  console.log("Color palatte: blues")
}
if (color_choice == greens) {
  props["Palette"] = "Greens"
  console.log("Color palatte: green")
}
if (color_choice == primaries) {
  props["Palette"] = "Primaries"
  console.log("Color palatte: primaries")
}
if (color_choice == coral) {
  props["Palette"] = "Coral"
  console.log("Color palatte: coral")
}
if (color_choice == burnt) {
  props["Palette"] = "Burnt"
  console.log("Color palatte: burnt")
}
if (color_choice == spring) {
  props["Palette"] = "Spring"
  console.log("Color palatte: spring")
}
if (color_choice == tropical) {
  props["Palette"] = "Tropical"
  console.log("Color palatte: tropical")
}
palatte_depth = R.random_int(3,5)
if (palatte_depth == 3) {
  props["Palette Depth"] = "Low"
}
if (palatte_depth == 4) {
  props["Palette Depth"] = "Medium"
}
if (palatte_depth == 5) {
  props["Palette Depth"] = "High"
}
console.log("Palatte depth:", palatte_depth)


grid_size = Math.floor(Math.sqrt(strokes))
grid_tracker = {"x" : 0, "y" : 0}
grid_quantum_x = WIDTH / grid_size
grid_quantum_y = HEIGHT / grid_size
grid_bounds = {"min_x" : 0, "max_x" : grid_size-1,
               "min_y" : 0, "max_y" : grid_size-1}
count = 0
var cnv

function setup() {
  cnv = createCanvas(WIDTH, HEIGHT)
  background(color_choice.bg)
  if (closure_mode == CLOSURE_WALKBACK) {
    strokeWeight(4*M)
  }
}

function get_coords() {
  if (grid_pattern) {
    // console.log(grid_tracker.x, grid_tracker.y)
    // console.log(grid_bounds)
    p = {"x" : grid_quantum_x*(grid_tracker.x+0.5),
         "y" : grid_quantum_y*(grid_tracker.y+0.5)}
    hold = false
    if (grid_bounds.min_x >= grid_bounds.max_x) {
      grid_tracker.x = grid_bounds.min_x
      hold=true
    }
    if (grid_bounds.min_y >= grid_bounds.max_y) {
      grid_tracker.y = grid_bounds.min_y
      hold=true
    }
    if (!hold) {
      if (grid_tracker.x < grid_bounds.max_x &&
          grid_tracker.y == grid_bounds.min_y) {
        grid_tracker.x += 1
      } else if (grid_tracker.x == grid_bounds.max_x &&
                grid_tracker.y < grid_bounds.max_y) {
        grid_tracker.y += 1
      } else if (grid_tracker.x > grid_bounds.min_x &&
                grid_tracker.y == grid_bounds.max_y) {
        grid_tracker.x -= 1
      } else if (grid_tracker.x == grid_bounds.min_x &&
                grid_tracker.y > grid_bounds.min_y) {
        grid_tracker.y -= 1
      }
      if (grid_tracker.x == grid_bounds.min_x &&
          grid_tracker.y == grid_bounds.min_y) {
        grid_bounds.min_x += 1
        grid_bounds.min_y += 1
        grid_bounds.max_x -= 1
        grid_bounds.max_y -= 1
        grid_tracker.x = grid_bounds.min_x
        grid_tracker.y = grid_bounds.min_y
      }
    }
    return p
  } else {
    if (count == 0) {
       return {"x" : WIDTH/2 + R.random_int(-
                                        curve_max_size,curve_max_size),
       "y" : HEIGHT/2 + R.random_int(-curve_max_size,curve_max_size)}
    } else {
      return {"x" : WIDTH*R.random(), "y" : HEIGHT*R.random()}
    }
  }
}

function draw_stroke(){
  c_idx = R.random_int(0,palatte_depth-1)
  c = color_choice.sc[c_idx]
  if (outline) {
    if (hot_outline) {
      stroke(color(255-color_choice.bg[0], 255-color_choice.bg[1],
                  255-color_choice.bg[2]))
    } else {
      stroke(color_choice.bg)
    }
  } else {
    stroke(c)
  }
  fill(c)
  p = get_coords()
  o_x = p.x
  o_y = p.y
  added_coords = []
  beginShape()
  curveVertex(p.x, p.y)
  added_coords.push({"x":p.x, "y":p.y})
  for (let i = 0; i < curves_per_stroke; i++) {
    if (straight_lines) {
      if (R.random_bool(0.5) < 0.5){
        p.x += R.random_int(-curve_max_size*step_scalar,
                            curve_max_size*step_scalar)*M
      } else {
        p.y += R.random_int(-curve_max_size*step_scalar,
                            curve_max_size*step_scalar)*M
      }
    } else {
      p.x += R.random_int(-curve_max_size*step_scalar,
                          curve_max_size*step_scalar)*M
      p.y += R.random_int(-curve_max_size*step_scalar,
                          curve_max_size*step_scalar)*M
    }
    added_coords.push({"x":p.x, "y":p.y})
    curveVertex(p.x,p.y)
  }
  
  if (closure_mode == CLOSURE_STAR && added_coords.length > 1) {
    added_coords.reverse()
    for (let i = 1; i < added_coords.length; i++) {
      curveVertex(WIDTH-added_coords[i].x, HEIGHT-added_coords[i].y)
    }
  } else if ((closure_mode == CLOSURE_WANDERBACK ||
              closure_mode == CLOSURE_WALKBACK) && 
             added_coords.length > 1) {
    added_coords.reverse()
    last_x = added_coords[0].x
    last_y = added_coords[0].y
    for (let i = 1; i < added_coords.length; i++) {
      dx = added_coords[i].x - last_x
      dy = added_coords[i].y - last_y
      curveVertex(last_x + (dx*sign), last_y + (dy*sign))
      last_x = added_coords[i].x
      last_y = added_coords[i].y
    }
  }
  if (closure_mode == CLOSURE_WALKBACK) {
    endShape()
  } else {
    endShape(CLOSE)
  }
} 

function save_mint() {
  let img_file = tokenData.hash + ".png"
  let json_file = tokenData.hash + ".json"
  let mint = 100
  let json = {
    name : "Midcentroid " + mint + "/100",
    properties : props
  }
  save(cnv, img_file)
  save(json, json_file)
  console.log("Next mint: "+(mint+1))
}

function draw() {
  draw_stroke()
  count += 1
  if (count >= strokes) {
    noLoop()
    save_mint()
  }
}

