uploadedfile="$1"
uploadedfilename="$2"
pngname="$3"

echo $uploadedfile
echo $uploadedfilename
echo $pngname
echo printingdone

scp -i /Users/adityaparmar/Desktop/cmpe281-us-west-1.pem $uploadedfile ec2-user@ec2-54-193-64-80.us-west-1.compute.amazonaws.com:/home/ec2-user

SCRIPT="pwd; ls; java -Dzanthan.prefs=diagram.preferences -jar sequence-10.0.jar --headless $uploadedfilename
"
ssh -i /Users/adityaparmar/Desktop/cmpe281-us-west-1.pem ec2-user@ec2-54-193-64-80.us-west-1.compute.amazonaws.com "${SCRIPT}"

echo hi


scp -i /Users/adityaparmar/Desktop/cmpe281-us-west-1.pem ec2-user@ec2-54-193-64-80.us-west-1.compute.amazonaws.com:/home/ec2-user/$pngname /Users/adityaparmar/GitHub/Multi-Tenant-SaaS-App/code/public/images
