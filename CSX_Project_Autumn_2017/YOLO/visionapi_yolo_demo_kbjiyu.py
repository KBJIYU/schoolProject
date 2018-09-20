import os
import cv2
import sys
import json
import numpy as np
from darkflow.net.build import TFNet

def to_json(dicto, json_file_name='test.json'):
    if not os.path.exists('./demo_folder/obj_info'):
        os.makedirs('./demo_folder/obj_info/')
    file_path = ('./demo_folder/obj_info/'+ json_file_name)
    print(file_path)
    js = json.dumps(dicto)
    # Open new json file if not exist it will create
    fp = open(file_path, 'w')
    # write to json file
    fp.write(js)
    # close the connection
    fp.close()


def VOD_darkflow(video_path, video_fps, tf_threshold=0.3, tf_gpu=0.9, output_name='VOD_result.avi'):
    
    # Set TFNet initiail options
    options = {"model": "cfg/yolo.cfg",
               "load": "bin/yolo.weights",
               "threshold": tf_threshold,
               "gpu": tf_gpu}    
    tfnet = TFNet(options)
        
    # Record use
    total_time = 0            # Caculate total time-cost
    total_tag_list = []       # Store detected object tags
    total_info = {}           # Store detected information frame-by-frame
    high_tag_dict = {}        # Store detected object tag with high confidence
    mid_tag_dict = {}         # Store detected object tag with mid confidence
    low_tag_dict = {}         # Store detected object tag with low confidence
    i = 0                     # Get frame-count use 
    
    # Check folder for saving data
    if not os.path.exists('./demo_folder/obj_images/objImg_high'):
        os.makedirs('./demo_folder/obj_images/objImg_high')
    if not os.path.exists('./demo_folder/obj_images/objImg_mid'):
        os.makedirs('./demo_folder/obj_images/objImg_mid')
    if not os.path.exists('./demo_folder/obj_images/objImg_low'):
        os.makedirs('./demo_folder/obj_images/objImg_low')
    if not os.path.exists('./demo_folder/obj_info'):
        os.makedirs('./demo_folder/obj_info/') 

    # Capture Video
    cap = cv2.VideoCapture(video_path)
    
    if video_path == 0:
        output_name = 'camVideo.avi'
        video_w = 800
        video_h = 600
    else:
        video_w = int(cap.get(3)) # float
        video_h = int(cap.get(4)) # float
        
    # Define the codec and create VideoWriter object
    fourcc = cv2.VideoWriter_fourcc(*'XVID')
    out = cv2.VideoWriter(('./demo_folder/'+output_name), fourcc, video_fps, (video_w, video_h))

    while(True):
        # Capture frame-by-frame
        ret, frame = cap.read()

        # Check time 
        e1 = cv2.getTickCount()

        if ret:
            # Initial dict for each frame
            total_info[i] = []

            # Prediction with tfnet 
            print('=== Start Predicting with darkflow ===')
            predictions = tfnet.return_predict(frame)
            if predictions:
                for item in predictions:
                    # Prediction information 
                    top_left_x = item['topleft']['x']
                    top_left_y = item['topleft']['y']
                    bot_right_x = item['bottomright']['x']
                    bot_right_y = item['bottomright']['y']
                    label = item['label']
                    confidence = item['confidence']
                    
                    # Create rectangle for detected object information and place
                    cv2.rectangle(frame, (top_left_x, top_left_y), (bot_right_x, bot_right_y), (0,255,0), 3)
                    cv2.putText(frame, label, (bot_right_x-150, bot_right_y-60), 
                                cv2.FONT_HERSHEY_SIMPLEX, 2, (0,0,255), 2, cv2.LINE_AA)
                    cv2.putText(frame, str(round(confidence, 3)),(bot_right_x-150,bot_right_y-20), 
                                cv2.FONT_HERSHEY_SIMPLEX, 1,(80,50,255),2,cv2.LINE_AA)
                    
                    # Detected object image 
                    detected_obj = frame[top_left_y:bot_right_y, top_left_x:bot_right_x] #[height1:height2, width1:width2]

                    # Store total_frames detection information
                    total_info[i].append((label, str(round(confidence, 3))))
                    
                    # Store all detected tags 
                    if label not in total_tag_list:
                        total_tag_list.append(label)

                    # Store the first high-confidence object's img
                    if confidence > 0.7:
                        if label not in list(high_tag_dict.keys()):
                            high_tag_dict[label] = (str(round(confidence, 2))+'_'+str(i))
                            cv2.imwrite('./demo_folder/obj_images/objImg_high/{0}_{1}.png'.format(label, (str(round(confidence, 2))+'_'+str(i))), detected_obj)

                    # Store the first mid-confidence object's img
                    elif confidence > 0.4:
                        if label not in list(mid_tag_dict.keys()):
                            mid_tag_dict[label] = (str(round(confidence, 2))+'_'+str(i))
                            cv2.imwrite('./demo_folder/obj_images/objImg_mid/{0}_{1}.png'.format(label, (str(round(confidence, 2))+'_'+str(i))), detected_obj)

                    # Store the first low-confidence object's img
                    else:
                        if label not in list(low_tag_dict.keys()):
                            low_tag_dict[label] = (str(round(confidence, 2))+'_'+str(i))
                            cv2.imwrite('./demo_folder/obj_images/objImg_low/{0}_{1}.png'.format(label, (str(round(confidence, 2))+'_'+str(i))), detected_obj)
                            
        else:
            break
        # Display the resulting frame
        cv2.imshow('frame',frame)

        # write the frame to the output
        if video_path == 0:
            frame = cv2.resize(frame,(video_w, video_h), interpolation = cv2.INTER_CUBIC)
        out.write(frame)

        # Check time spent
        e2 = cv2.getTickCount()
        print('Cost time:',(e2 - e1)/cv2.getTickFrequency())
        total_time += ((e2 - e1)/cv2.getTickFrequency())
        
        # Frame count 
        i += 1

        # Quit
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Print Finished Hint Message
    print("=== VOD_darkflow has finished. ===")
    print("Video was saved as:", output_name)
    
    # Print Total Time Spent
    print("=== Total Time Spent ===")
    print(total_time, ' secs')
            
    # Print Information Saved Hint Message
    print("=== Detect Information saving... ===")
    to_json(dicto=total_info, json_file_name='total_info.json')
    to_json(dicto=low_tag_dict, json_file_name='low_tag_dict.json')
    to_json(dicto=high_tag_dict, json_file_name='high_tag_dict.json')
    to_json(dicto=mid_tag_dict, json_file_name='mid_tag_dict.json')
    to_json(dicto=total_tag_list, json_file_name='total_tag_list.json')
    print("=== Detect Information was saved. ===")
    
    # When everything done, release the capture
    cap.release()
    cv2.destroyAllWindows()


# VOD_darkflow Example:
VOD_darkflow(video_path=0, 
             video_fps=30, 
             output_name='DEMO.avi')
