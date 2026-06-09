Employee Facial Recognition System using AWS Rekognition  

A cloud-based facial recognition system . The system uses AWS Rekognition to automatically verify and authenticate employees in real time — faster, more secure, and more accurate. 

 

🚀 Features 

Real-time face recognition using AWS Rekognition 

Webcam-based  marking — no manual input needed 

Instant authentication with success/failure feedback 

Serverless architecture — no server management required 

Secure employee registration via S3 

Full audit trail stored in DynamoDB 

 

🛠️ Tech Stack 

AWS Services 

Amazon Rekognition -Face indexing and recognition  

AWS Lambda -Serverless business logic   

Amazon S3 -Employee and visitor image storage  

Amazon DynamoDB- Employee data storage  

Amazon API Gateway -REST API endpoints  

AWS IAM -Roles and permissions 

Amazon CloudWatch -Logging and monitoring  

 

Frontend 

React JS 

react-webcam 

 

🏗️ Architecture 



 

EMPLOYEE REGISTRATION (Admin) 
────────────────────────────── 
Admin uploads employee photo to S3 
       ↓ 
S3 triggers Registration Lambda 
       ↓ 
Lambda indexes face in Rekognition Collection 
       ↓ 
Lambda saves FaceID + Employee Name in DynamoDB 
 
 
Recognising Employee
────────────────────────────── 
Employee opens React frontend 
       ↓ 
Webcam captures face photo 
       ↓ 
React sends image to API Gateway 
       ↓ 
API Gateway triggers Auth Lambda 
       ↓ 
Lambda searches face in Rekognition Collection 
       ↓ 
Rekognition returns matched FaceID 
       ↓ 
Lambda fetches employee name from DynamoDB 
       ↓ 
Frontend displays: "Welcome [Name]!" ✅ 
or "Person not recognised" ❌ 
 

 

⚙️ How It Works 

Employee Registration 

Admin uploads employee photo to the S3 bucket (named as FirstName_LastName.jpeg) 

S3 event notification automatically triggers the Registration Lambda 

Lambda sends the image to Rekognition which indexes the face and returns a unique FaceID 

Lambda stores the FaceID along with the employee's name in DynamoDB 

Recognising Employee 

Employee visits the React frontend and clicks Capture Photo 

The webcam takes a snapshot which is sent to API Gateway 

Auth Lambda receives the image and calls Rekognition's SearchFacesByImage API 

If a match is found, Lambda fetches the employee details from DynamoDB 

A success message with the employee's name is displayed on the frontend 

 

🚦 Getting Started 

Prerequisites 

AWS Account 

Node.js installed 

Frontend Setup 

# Clone the repository 
git clone https://github.com/KirtiMittal19/smart-attendance-system.git 
 
# Navigate to project folder 
cd facial-recognition-app 
 
# Install dependencies 
npm install 
 
# Add your API Gateway URL in App.js 
const API_URL = 'YOUR_API_GATEWAY_URL'; 
 
# Start the app 
npm start 
 

AWS Setup 

Create a S3 bucket— for employee photos 

Create a DynamoDB table named employee with rekognition-id as the primary key 

Use cloud shell to configure Rekognition Collection named employee 

Deploy both Lambda functions (registration and authentication) with correct IAM roles 

Configured S3 Event Notification by adding S3 as a trigger on Registration Lambda 

Set up API Gateway with /attendance (PUT) and /register (POST) endpoints 

Add S3 event notification to trigger Registration Lambda on image upload 

🔒 Security 

IAM roles follow the Principle of Least Privilege 

Each Lambda function only has permissions it needs 

API Gateway URL should be stored as environment variable in production 

CORS enabled on API Gateway for frontend access 

 

## 🚀 Future Enhancements  

 

1. Visitor Photo Storage - Save every attendance photo to S3 visitor bucket for audit trail and record keeping  

 

2. Admin Dashboard- Web interface to view daily/monthly visit reports and employee records 

 

3. Anti-Spoofing - Prevent authentication using printed photos or phone screens by implementing liveness detection 

 

4. CloudFront Deployment - Deploy React frontend globally using AWS S3 + CloudFront for faster loading and HTTPS 

 

👩‍💻 Author 

Kirti Mittal 

GitHub: @KirtiMittal19 

 

 
