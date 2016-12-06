# FunData Mooc模块需求文档
### 前端：洪嘉勇
### 后端：夏陈
***
## 首页(/mooc)
### 简介
	导航栏处有一个巨幕将投出5个最受欢迎的课
	然后下方将有一栏是后续热门的课程，初始放8个 
	会有一个more按钮 点击后再出8个
	接下来是其他的课
### 数据需求
#### screen\_hot\_course
	巨幕上的最精品的5个课
``` json
	{	
		screen_hot_course:
		[
			{
				pic_url:x,
				course_id:x,
				course_name:x
			},
			...
		]
	}
```

#### boutique_course
	精品课程，算上最精品的5个课，精品课程就取前20个课，剩下的都是other
``` json
	{
		boutique_course:
		[
			{
				course_id:x,
				course_name:x,
				course_rank:x,
				course_join_sum:x,
				course_teacher_name:x
			},
			...
		]
	}
```
	点击more之后会有ajax请求,请求会给当前屏幕上精品课程的数量 
	根据rank返回之后的8个课 
``` json
	{
		boutique_course:
		[
			{
				course_id:x,
				course_name:x,
				course_rank:x,
				course_join_sum:x,
				course_owner_name:x,
				course_owner_id:x
			},
			...
		]
	}
```

#### other_course
	others中的课程
``` json
	{
		boutique_course:
		[
			{
				course_id:x,
				course_name:x,
				course_rank:x,
				course_join_sum:x,
				course_teacher_name:x
			},
			...
		]
	}
```
	点击more之后同精品课程 这边还是按照rank输出
	
## 详情页(/mooc/:courseId/:courseName/detail)
### 简介
	后端将可以拿到courseId和courseName
	该页面由overview,steps和Q&A组成
	初始加载Overview分页 其他分页ajax异步请求 使用缓存
### 数据需求
#### 一个课的全部数据先写在这儿 然后ajax请求的时候 你拆出来就好了
``` json
	{
		course_detail:
		{
			course_id:x,
			course_name:x,
			course_overview:
			{	
				overview_content:x
			},
			course_steps:
			[
				{
					step_header:x,
					step_content:x,
					step_pic_url:x
				},
				...
			]
			course_qa:
			{
				answered:
				[
					{
						question:
						{
							question_id:x;
							question_owner_name:x,
							question_owner_id:x,
							question_time:x,
							question_content:x
						},
						answer:
						{
							answer_id:x;
							answer_owner_name:x;
							answer_owner_id:x;
							answer_time:x;
							answer:content:x
						}
					},
					...
				],
				unanswered:
				[
					{
						question_id:x;
						question_owner_name:x,
						question_owner_id:x,
						question_time:x,
						question_content:x
					},
					...
				]
			}
		}
	}
```

#### 游客信息
	需要知道游客和这门课是什么关系 只是游客就得提供join功能 参与者要提供退课
	是拥有者就要在这里提供manage跳转链接和reply问题按钮的显示
``` json
{
	user:
	{
		user_id:x,
		user_name:x,
		// 这里-1就是游客 0就是参与的 1就是拥有者
		user_flag:x;
	}
}
```
### 传给后端
#### 添加问题
user\_id question\_content
#### 回复问题
user\_id question\_id answer\_content

## 个人信息页（/mycenter/profile/xxx）
### 简介
	该页显示了用户的课程列别 并且提供查看、管理、删除、添加的链接
### 数据需求
#### 课程列表
	就是打表用的
``` json
{
	my_course:
	[
		{
			course_id:x,
			course_name:x,
			course_des:x,
			course_owner_id:x,
			coutse_owner_name:x
		}
	],
	...
}
```
### 传给后台
#### 添加课
- course\_name 
- course\_des

#### 删除课
- course\_id

## 课程管理页（/mooc/courseId/manager）
### 简介
	该页可以对课程内容进行管理和编辑 比较复杂 看不太明白面谈
### 数据需求
	数据需求和detail是一模一样的 因为需要把选在课程的detail是怎么样的先
	打印出来
### 传给后台
#### 添加课程步骤
- course\_id
- step\_name 
- step\_content
- guide\_pic(一张上传的图片) 
- step\_num

#### 编辑overview
- course\_id 
- overview\_content

#### 编辑步骤
- course\_id
- step\_num
- step\_target(0表示编辑文字 1表示编辑图片)
- step\_content(如果是文字)
- step\_pic_url(如果是图片)

 

	