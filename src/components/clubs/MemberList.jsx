import {
	Dialog,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from "@mui/material";
import StudentAvatar, { getNameFromEmail } from "../common/StudentAvatar";

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
							<StudentAvatar student={student} />
						</ListItemAvatar>
						<ListItemText
							primary={
								student.name
									? student.name
									: getNameFromEmail(student.email)
							}
							secondary={student.rollNo}
						/>
					</ListItem>
				))}
			</List>
		</Dialog>
	);
}
