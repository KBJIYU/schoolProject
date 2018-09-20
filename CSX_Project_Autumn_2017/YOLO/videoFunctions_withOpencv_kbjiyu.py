import os
import cv2
import sys
import json
import numpy as np

class VideoFuctions_kbjiyu:

    def __init__(self):
        pass

    # Video Cut Function
    def video_cut(video_path, video_timeLength, video_fps, startTime_second, endTime_second, 
                output_fps, output_w, output_h, output_name='output.avi'):
        """
            1. Input: video_path
            2. Input: video_timeLength, the [total length of video] in seconds.
            3. Input: video_fps, the [frames per second].
            4. Input: startTime_second, is the [percentage of the spliting_start_time] of the video.
            5. Input: endTime_second, is the [percentage of the spliting_end_time] of the video. 
            6. Input: set toe output video's [Output_fps, output_w, output_h].
            7. Output: will be [.avi] format video with the [split part] of video.
        """
        # Capture video
        cap = cv2.VideoCapture(video_path)
        
        # Define the codec and create VideoWriter object
        fourcc = cv2.VideoWriter_fourcc(*'XVID')
        out = cv2.VideoWriter(output_name, fourcc, output_fps, (output_w, output_h))
        
        # Set specific frame-range of video
        frame_total = video_timeLength * video_fps   # 0 - frame_total
        frame_start = startTime_second * video_fps   
        frame_end = endTime_second * video_fps
        print(frame_start, '--->', frame_end)
        
        # Check time 
        e1 = cv2.getTickCount()
        
        for i in range(frame_start, frame_end):
            
            # Set frame selection with frame place-percent(between 0.0-1.0)
            cap.set(1, i)
            
            # Read and Save
            ret, frame = cap.read()
            print(i)
            if ret:
                
                # Some tricks
                kernel = np.ones((3,3),np.uint8)
                frame = cv2.morphologyEx(frame, cv2.MORPH_OPEN, kernel)
                
                # Resize it 
                frame = cv2.resize(frame,(output_w, output_h), interpolation = cv2.INTER_CUBIC)
                
                # write the frame to the output
                out.write(frame)
                
                # Show 
                cv2.imshow('frame',frame)
                
                # Exit
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break
            else:
                break
                
        # Check time spent
        e2 = cv2.getTickCount()
        print('Cost time:',(e2 - e1)/cv2.getTickFrequency())
        
        # Release everything if job is finished
        cap.release()
        out.release()
        cv2.destroyAllWindows()

    # Video Merge
    def videos_merge(video_path_list, output_fps, output_w, output_h, output_name = 'mergeee.avi'):
        """
            1. Input: video_path_list
            2. Input: set toe output video's [Output_fps, output_w, output_h].
            3. Output: will be [.avi] format [merged] video.
        """

        # Define the codec and create VideoWriter object
        fourcc = cv2.VideoWriter_fourcc(*'XVID')
        out = cv2.VideoWriter(output_name, fourcc, output_fps, (output_w, output_h))

        # Check time spent
        e1 = cv2.getTickCount()
        for video in video_path_list:
            print('Start:', video)
            
            # Capture video
            cap = cv2.VideoCapture(video)
            while(True):
                # Capture frame-by-frame
                ret, frame = cap.read() 
                if ret:
                    # write the frame to the output
                    out.write(frame)

                    # Show 
                    cv2.imshow('frame',frame)

                    # Exit
                    if cv2.waitKey(1) & 0xFF == ord('q'):
                        break
                else:
                    break 
            print('End:', video)
            
        # Check time spent
        e2 = cv2.getTickCount()
        print('Cost time:',(e2 - e1)/cv2.getTickFrequency())
        
        # When everything done, release the capture
        cap.release()
        cv2.destroyAllWindows()       

    # Video Format Transfer Function
    def video_format_transfer(video_path, output_format='mp4', output_name='video_formatted', output_fps=30, output_w=800, output_h=600):
        
        # Define the codec and create VideoWriter object
        if output_format == 'mp4':
            fourcc = cv2.VideoWriter_fourcc('M','J','P','G')
        elif output_format == 'avi':
            fourcc = cv2.VideoWriter_fourcc(*'XVID')
        else:
            fourcc = 0
        
        if fourcc:
            out = cv2.VideoWriter(output_name, fourcc, output_fps, (output_w, output_h))

            # Check time spent
            e1 = cv2.getTickCount()
            # Capture video
            cap = cv2.VideoCapture(video_path)

            while(True):
                # Capture frame-by-frame
                ret, frame = cap.read() 
                if ret:
                    # Resize it 
                    frame = cv2.resize(frame,(output_w, output_h), interpolation = cv2.INTER_CUBIC)

                    # write the frame to the output
                    out.write(frame)

                    # Show 
                    cv2.imshow('frame',frame)

                    # Exit
                    if cv2.waitKey(1) & 0xFF == ord('q'):
                        break
                else:
                    break 

            # Check time spent
            e2 = cv2.getTickCount()
            print('End:', video_path)
            print('Cost time:',(e2 - e1)/cv2.getTickFrequency())

            # When everything done, release the capture
            cap.release()
            cv2.destroyAllWindows()       
        else:
            print('please Input the correct format: ["MP4" or "AVI"] ')

    # Video Frame_caculator Function
    def frame_caculator(video_path):
        """
            This is just for test( Could do by mutiple fps with video_lengthSeconds)
        """
        total_frame = 0
        cap = cv2.VideoCapture(video_path)
        while(True):
            try:
                ret, frame = cap.read()
                # cv2.imshow('frame',frame)
                if ret:
                    total_frame +=1
                    # Quit
                    if cv2.waitKey(1) & 0xFF == ord('q'):
                        break
                else:
                    break
            except:
                break
        print('this is end', total_frame)
        # When everything done, release the capture
        cap.release()
        cv2.destroyAllWindows()

#########################################################################################
# Example Initialize the class
# V = VideoFuctions_kbjiyu()

# Example video_cut:
# V.video_cut(video_path='./MrSmith.mp4',   # path to access video  
#           video_timeLength=(5*60+8),    # Input video's property: total time-Length in second. 
#           video_fps=30,                 # Input video's property: video's frame per second.
#           startTime_second=(0*60+22),   # cut_start_second:  ex: 20
#           endTime_second=(0*60+40),     # cut_end_second:    ex: 30
#           output_fps=30,                # Output video's property: video's frame per second. 
#           output_h=800,                 # Output video's property: video's height.
#           output_w=600,                 # Output video's property: video's width. 
#           output_name='smith_18.avi')      # Output video's property: video's name. (format can't be changed here.)

# Example videos_merge: 
# video_path_list = ['./catdog_18.avi', './smith_18.avi', './conan_18.avi', './keny_181.avi', './keny_182.avi']
# V.videos_merge(video_path_list=video_path_list, output_fps=30, output_h=800, output_w=600, output_name='mergeee.avi')

# Example video_format_transfer:
# V.video_format_transfer('./test.mpg', output_format='avi', output_name='video_formatted.mp4', output_fps=30, output_w=800, output_h=600)

# Example frame_caculator:
# V.frame_caculator('./test.avi')

