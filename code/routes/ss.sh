uploadedfile="$1"
uploadedfilename="$2"
pngname="$3"

echo $uploadedfile
echo $uploadedfilename
echo $pngname
echo printingdone

scp -i /Users/adityaparmar/Desktop/personalkey.pem $uploadedfile ec2-user@ec2-54-191-191-40.us-west-2.compute.amazonaws.com:/home/ec2-user

SCRIPT="pwd; ls; java -Dzanthan.prefs=diagram.preferences -jar sequence-10.0.jar --headless $uploadedfilename
"
ssh -i /Users/adityaparmar/Desktop/personalkey.pem ec2-user@ec2-54-191-191-40.us-west-2.compute.amazonaws.com "${SCRIPT}"

echo hi


scp -i /Users/adityaparmar/Desktop/personalkey.pem ec2-user@ec2-54-191-191-40.us-west-2.compute.amazonaws.com:/home/ec2-user/$pngname /Users/adityaparmar/GitHub/Multi-Tenant-SaaS-App/code/public/images
