int step = 10;  //# of pixels between computed Psi-values
int time = 0;

int d=81;  // = 81 = the dimensionality of this discretized Hilbert space

float[] Psi = new float[d];            // = |<x|Psi>|^2, the probability density indexed by position representation
float[] E = new float[d];              // = <E|Psi>, i.e. the state vector in energy representation  (pre-normalization)
int[][] Herm = new int[d][d];          //   Herm[i][j] = jth power of ksi in ith Hermite polynomial 
float[] C = new float[d];              // = factor 1/(sqrt(2^n * n!)), the normalization constant for nth Hermite polynomial

float A1 = 0;
float A2 = 0;
float B1 = 0;
float B2 = 0;
float sx = 0.15;   // = ksi/i, distance constant
float sy = 40;   
float summer;
int NormConst=0;

float tt = 0.019;  //time constant

/* @pjs preload="state_labels.gif"; */  
//PImage psis;

void setup() {
  
    size(801, 601);
    frameRate(40);
    //psis = loadImage("state_labels.gif");
    
    smooth();
    
    C[0] = 1;
    for(int i=0; i<d; i++) {
      if(i>0) { C[i] = C[i-1]/sqrt(2*i); } 
      E[i] = 0;
      for(int j=0; j<d; j++) {
        Herm[i][j]=0;
      }
    }
    
    Herm[0][0] = 1;
    Herm[1][1] = 2;
    
    // Begin recursive Hermitian polynomial definition
    for(int n=1; n<(d-1); n++) {      //  (n+1)th Hermite polynomial defined in terms of preceeding 2
      for(int i=0; i<(d-1); i++) {
        Herm[n+1][i] -= 2*n*Herm[n-1][i];
        Herm[n+1][i+1] += 2*Herm[n][i];
      } 
    }    
    
    // Arbitrary initial values
    E[0] = 0;
    E[1] = 12;
    E[2] = 20;
    E[3] = 67;
    E[4] = 79;
    E[5] = 17;
    E[6] = 43;

    for(int x=0; x<=6; x++) { NormConst += sq(E[x]); }

}

void draw() {

    time++;
  
    background(#EFF2E6);
    //C9D7D0
    
    stroke(#BBBBBB);
    
    line(width/2, 0, width/2, height/2);
    
    for(int i=0; i<=d/2; i++) {
      
      A1 = 0;   // corresponds to real component for x positive
      A2 = 0;   // corresponds to real component for x negative
      B1 = 0;   // corresponds to imaginary component for x positive
      B2 = 0;   // corresponds to imaginary component for x negative
      
      for(int n=0; n<8; n++) {
        A1 += cos((n+0.5)*tt*time)*E[n]*C[n]*(Herm[n][0] 
              + (i*sx)*Herm[n][1] 
              + pow(i*sx,2)*Herm[n][2] 
              + pow(i*sx,3)*Herm[n][3] 
              + pow(i*sx,4)*Herm[n][4]
              + pow(i*sx,5)*Herm[n][5]
              + pow(i*sx,6)*Herm[n][6]
              + pow(i*sx,7)*Herm[n][7]);
              
        A2 += cos((n+0.5)*tt*time)*E[n]*C[n]*(Herm[n][0] 
              - (i*sx)*Herm[n][1] 
              + pow(i*sx,2)*Herm[n][2] 
              - pow(i*sx,3)*Herm[n][3] 
              + pow(i*sx,4)*Herm[n][4]
              - pow(i*sx,5)*Herm[n][5]
              + pow(i*sx,6)*Herm[n][6]
              - pow(i*sx,7)*Herm[n][7]);
              
        B1 += sin((n+0.5)*tt*time)*E[n]*C[n]*(Herm[n][0] 
              + (i*sx)*Herm[n][1] 
              + pow(i*sx,2)*Herm[n][2] 
              + pow(i*sx,3)*Herm[n][3] 
              + pow(i*sx,4)*Herm[n][4]
              + pow(i*sx,5)*Herm[n][5]
              + pow(i*sx,6)*Herm[n][6]
              + pow(i*sx,7)*Herm[n][7]);
              
        B2 += sin((n+0.5)*tt*time)*E[n]*C[n]*(Herm[n][0] 
              - (i*sx)*Herm[n][1] 
              + pow(i*sx,2)*Herm[n][2] 
              - pow(i*sx,3)*Herm[n][3] 
              + pow(i*sx,4)*Herm[n][4]
              - pow(i*sx,5)*Herm[n][5]
              + pow(i*sx,6)*Herm[n][6]
              - pow(i*sx,7)*Herm[n][7]);
      }
    
      Psi[(40+i)] = sq(exp(-0.5*sq(i*sx))) * 0.0003 * (sq(A1) + sq(B1));
      Psi[(40-i)] = sq(exp(-0.5*sq(i*sx))) * 0.0003 * (sq(A2) + sq(B2));
    }
    
    //  MAIN DRAW CYCLE:

    fill(#000000);
    stroke(#000000);
    line(0, height/2, width-1, height/2);
    beginShape(); 
    vertex(0, height/2);
    for(int i=0; i<d; i++) {
      curveVertex(step*i, height/2 - sy*Psi[i]);
    }
    vertex(width-1, height/2);
    endShape();
    
    
    //  Energy Level Control:
    
    translate(width/2 + 5, height/2 + 165);
    
    fill(#F0DF5E);
    stroke(#000000);
    
    rect(120, -E[7], 30, E[7]);
    rect(80, -E[6], 30, E[6]);
    rect(40, -E[5], 30, E[5]);
    rect(00, -E[4], 30, E[4]);
    rect(-40, -E[3], 30, E[3]);
    rect(-80, -E[2], 30, E[2]);
    rect(-120, -E[1], 30, E[1]);
    rect(-160, -E[0], 30, E[0]);
    
    noFill();
    stroke(#000000);
    
    rect(+120, -150, 30, 150);
    rect(+80, -150, 30, 150);
    rect(+40, -150, 30, 150);
    rect(+00, -150, 30, 150);
    rect(-40, -150, 30, 150);
    rect(-80, -150, 30, 150);
    rect(-120, -150, 30, 150);
    rect(-160, -150, 30, 150);
    
    
   //image(psis, -160, 2);
    
}



void mousePressed() {
  boolean allow;
  int y = mouseY;
  int x = mouseX;
  int yb = height/2 + 165;
  int xb = width/2 - 155;
  if((y >= yb-150) && (y <= yb + 7)) {
    allow = false;
    for(int i=0; i<8; i++) { 
       if((x >= xb + i*40) &&(x <= xb+30+i*40)) { }
       else { if(E[i]!=0) { allow=true; } }
     }
     for(int i=0; i<8; i++) {   
       if((x >= xb + i*40)&&(x <= xb+30+i*40)) {
       
          if(yb-y > 0) { E[i] = yb-y; }
          if((yb-y <= 0)&&(allow)) { E[i] = 0; }
          summer = 0;
          for(int j=0; j<d; j++) {
            summer += sq(E[j]);
          }
          for(int j=0; j<d; j++) {     
            E[j] = E[j]*sqrt(NormConst/summer);  
          } 
       }
     }
  }  
}

void mouseDragged() {
  boolean allow;
  int y = mouseY;
  int x = mouseX;
  int yb = height/2 + 165;
  int xb = width/2 - 155;
  if((y >= yb-150) && (y <= yb + 7)) {
    allow = false;
    for(int i=0; i<8; i++) { 
       if((x >= xb + i*40) &&(x <= xb+30+i*40)) { }
       else { if(E[i]!=0) { allow=true; } }
     }
     for(int i=0; i<8; i++) {   
       if((x >= xb + i*40)&&(x <= xb+30+i*40)) {
       
          if(yb-y > 0) { E[i] = yb-y; }
          if((yb-y <= 0)&&(allow)) { E[i] = 0; }
          summer = 0;
          for(int j=0; j<d; j++) {
            summer += sq(E[j]);
          }
          for(int j=0; j<d; j++) {     
            E[j] = E[j]*sqrt(NormConst/summer);  
          } 
       }
     }
  }  
}

