scp -i /Users/adityaparmar/Downloads/cmpe281-us-west-1.pem /Users/adityaparmar/Desktop/cmpe202-master/umlmodels/sequence/example.seq ec2-user@ec2-54-193-114-223.us-west-1.compute.amazonaws.com:/home/ec2-user

SCRIPT="pwd; ls; java -Dzanthan.prefs=diagram.preferences -jar sequence-10.0.jar --headless example.seq"

ssh -i /Users/adityaparmar/Downloads/cmpe281-us-west-1.pem ec2-user@ec2-54-193-114-223.us-west-1.compute.amazonaws.com "${SCRIPT}"

echo hi

scp -i /Users/adityaparmar/Downloads/cmpe281-us-west-1.pem ec2-user@ec2-54-193-114-223.us-west-1.compute.amazonaws.com:/home/ec2-user/example.png /Users/adityaparmar/Desktop/cmpe202-master/umlmodels/sequence