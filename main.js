img="";
object=[];
status="";
function preload(){
img=loadImage('dog_cat.jpg');
}
function setup(){
    canvas=createCanvas(420,420);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status:Detecting objects";
}
function modelLoaded(){
    console.log("model loaded")
    status=true;
    
    
}
function gotResult(error,results){
    if(error){
    console.log(error);
    }

    console.log(results);
    object=results;
    }

function draw(){
image(video,0,0,420,420);
if(status !=""){
    r=random(255);
    g=random(255);
    b=random(255);
    objectDetector.detect(video,gotResult);
    for(i=0;i<object.length;i++){
        
        document.getElementById("status").innerHTML="status:object detetcted";
        document.getElementById("number_of_objects").innerHTML="Number of objects detected are: " + object.length;

fill(r,g,b);
percent=floor(object[i].confidence  * 100);

text(object[i].label +"  "+percent +"%",object[i].x,object[i].y );
noFill();

stroke(r,g,b);
rect(object[i].x,object[i].y,object[i].width,object[i].height);
}
}
}