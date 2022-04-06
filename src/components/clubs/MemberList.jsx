import {
	Avatar,
	Dialog,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from "@mui/material";

export default function MemberList({
	showMemberList,
	setShowMemberList,
	members,
}) {
	return (
		<Dialog open={showMemberList} onClose={() => setShowMemberList(false)}>
			<List sx={{ maxHeight: "lg", p: 4 }}>
				<Typography variant="h6">Club Members</Typography>
				<Divider sx={{ borderColor: "text.secondary" }} />
				{members.map((student) => (
					<ListItem>
						<ListItemAvatar>
							<Avatar
								alt={student.name}
								src={student.profilePicUrl}
							>
								{student.name
									.split(" ")
									.map((value) => value[0].toUpperCase())
									.join("")}
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={student.name}
							secondary={student.rollNo}
						/>
					</ListItem>
				))}
			</List>
		</Dialog>
	);
}
